'use client';

import { useState } from 'react';
import { getGenreRecommendations, GenreRecommendationsOutput } from '@/ai/flows/genre-recommendations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, Music } from 'lucide-react';

export default function RecommendationsPage() {
  const [listeningHistory, setListeningHistory] = useState('Pop, Rock, 90s alternative');
  const [recommendations, setRecommendations] = useState<GenreRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await getGenreRecommendations({ listeningHistory });
      setRecommendations(result);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
       <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          For You
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Get Recommendations</CardTitle>
            <CardDescription>
              Tell us what you like, and our AI will suggest new music for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="listening-history">Your listening habits (genres, artists, decades, etc.)</Label>
                <Textarea
                  id="listening-history"
                  value={listeningHistory}
                  onChange={(e) => setListeningHistory(e.target.value)}
                  placeholder="e.g., Electronic, Daft Punk, 80s synthpop"
                  rows={4}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate My Mixtape
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          {isLoading && (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Finding your next favorite artists...</p>
              </CardContent>
            </Card>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {recommendations && (
            <Card>
              <CardHeader>
                <CardTitle>Here's Your Mixtape</CardTitle>
                <CardDescription>Based on your input, you might like these:</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.recommendations.split(',').map((rec, index) => (
                    <li key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                      <Music className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{rec.trim()}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
