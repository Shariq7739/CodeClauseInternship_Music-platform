import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container px-4 lg:px-6 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                    Discover Your Next Favorite Tune
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Rhythmic is your personal gateway to a universe of music.
                    Explore, create playlists, and get AI-powered recommendations
                    tailored just for you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">Get Started</Link>
                  </Button>
                </div>
              </div>
              <Image
                data-ai-hint="music abstract"
                src="https://picsum.photos/seed/hero/600/600"
                width="600"
                height="600"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">
                  Features Crafted for Music Lovers
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From intelligent search to personalized playlists, Rhythmic has everything you need to enjoy the music you love.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Smart Search</h3>
                <p className="text-sm text-muted-foreground">Quickly find any song, artist, or genre with our powerful search engine.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Playlist Management</h3>
                <p className="text-sm text-muted-foreground">Create, edit, and share your perfect playlists for any mood or occasion.</p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground">Get song and artist suggestions based on your unique listening habits.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Rhythmic. All rights reserved.</p>
      </footer>
    </div>
  );
}
