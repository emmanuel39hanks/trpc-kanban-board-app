import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, User, LogOut, Settings, HelpCircle, Plus } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { AudioPlayer } from "../audio/AudioPlayer";
import logo from "../../../assets/logo.png";
import { TimedTaskDrawer } from "../timed-tasks/TimedTaskDrawer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Header() {
  const { user, isLoading } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const createBoardMutation = trpc.board.create.useMutation();
  const utils = trpc.useUtils();
  const router = useRouter();

  const isOnBoardsPage = router.pathname === "/boards";

  const handleCreateBoard = async () => {
    await createBoardMutation.mutateAsync({ name: newBoardName });
    setNewBoardName("");
    setIsDialogOpen(false);
    utils.board.getAll.invalidate();
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div className="flex items-center">
        <Image src={logo} alt="LemoBoards Logo" width={200} height={40} />
      </div>
      <nav className="flex items-center">
        {user && <AudioPlayer />}
        {user && <TimedTaskDrawer />}
        {user && isOnBoardsPage && (
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="mr-4"
          >
            <Plus className="h-4 w-4 mr-2" /> Create Board
          </Button>
        )}
        {user && !isOnBoardsPage && (
          <Button variant="outline" className="mr-4">
            <Link href="/boards">My Boards</Link>
          </Button>
        )}
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="opacity-50 cursor-not-allowed">
                <Settings className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="opacity-50 cursor-not-allowed">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/api/auth/logout" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/api/auth/login">
              <Button variant="outline" className="mr-2">
                Log in
              </Button>
            </Link>
            <Link href="/api/auth/login">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </nav>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
          </DialogHeader>
          <Input
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="Board Name"
          />
          <DialogFooter>
            <Button onClick={handleCreateBoard}>Create Board</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
