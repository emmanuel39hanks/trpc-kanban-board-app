import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceRecorderProps {
  onRecordingComplete: (taskTitle: string, taskDuration: number) => void;
  onClose: () => void;
}

export function VoiceRecorder({
  onRecordingComplete,
  onClose,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const createTask = trpc.timedTask.create.useMutation({
    onSuccess: () => {
      console.log("Task created successfully");
      setIsProcessing(false);
      onRecordingComplete("", 0);
      onClose();
      toast({
        title: "Task created",
        description: "Your timed task has been created successfully.",
      });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      setIsProcessing(false);
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const processAudio = trpc.timedTask.processVoiceCommand.useMutation({
    onSuccess: (data: any) => {
      console.log("Audio processed successfully:", data);
      createTask.mutate({
        title: data.title,
        duration: parseInt(data.duration.toString(), 10),
      });
    },
    onError: (error) => {
      console.error("Error processing audio:", error);
      setIsProcessing(false);
      toast({
        title: "Error processing audio",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    let chunks: Blob[] = [];
    let timer: NodeJS.Timeout;

    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();

        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          setAudioBlob(blob);
          chunks = [];
          handleSubmit(blob);
        });

        timer = setInterval(() => {
          setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
      });
    } else {
      setRecordingTime(0);
    }

    return () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
      clearInterval(timer);
    };
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    } else {
      setIsRecording(true);
    }
  };

  const handleSubmit = async (blob: Blob) => {
    if (blob) {
      console.log("Submitting audio for processing");
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      console.log("FormData created:", formData);
      const audioArrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(audioArrayBuffer);
      processAudio.mutate({ audio: Array.from(uint8Array) });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Voice Recorder</h2>
            <p className="text-sm text-gray-500">
              {isProcessing
                ? "Processing your task..."
                : isRecording
                ? "Recording in progress"
                : "Click to start recording"}
            </p>
          </div>
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
            <Button
              onClick={handleToggleRecording}
              variant="ghost"
              className={`w-24 h-24 rounded-full ${
                isProcessing
                  ? "bg-yellow-500 text-white"
                  : isRecording
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing" : isRecording ? "Stop" : "Start"}
            </Button>
          </div>
          <div className="text-2xl font-semibold">
            {isProcessing ? "Please wait..." : formatTime(recordingTime)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
