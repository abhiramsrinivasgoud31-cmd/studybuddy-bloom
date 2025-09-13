import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Heart, Calendar, BookOpen, TrendingUp, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import moodVerySad from "@/assets/mood-very-sad.png";
import moodSad from "@/assets/mood-sad.png";
import moodNeutral from "@/assets/mood-neutral.png";
import moodGood from "@/assets/mood-good.png";
import moodExcellent from "@/assets/mood-excellent.png";

const StudentWellnessPlatform = () => {
  // Mock data for user info and wellness history
  const [userData] = useState({
    name: "Alex Johnson",
    streak: 7,
    lastCheckIn: "2023-11-15",
    wellnessScore: 72,
  });

  const [moodData, setMoodData] = useState([
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 3 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 2 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 5 },
    { day: "Sun", mood: 3 },
  ]);

  const [wellnessResources] = useState([
    {
      title: "Mindfulness Meditation",
      description: "Guided 10-minute meditation for stress relief",
      icon: <Sun className="h-6 w-6" />,
    },
    {
      title: "Sleep Hygiene Tips",
      description: "Improve your sleep quality with these strategies",
      icon: <Moon className="h-6 w-6" />,
    },
    {
      title: "Study Break Exercises",
      description: "Quick physical activities to refresh your mind",
      icon: <Heart className="h-6 w-6" />,
    },
  ]);

  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showCheckInSuccess, setShowCheckInSuccess] = useState(false);

  const handleMoodSelection = (value: string) => {
    setSelectedMood(parseInt(value));
  };

  const submitMoodCheckIn = () => {
    if (selectedMood !== null) {
      // In a real app, this would send data to the backend
      setShowCheckInSuccess(true);
      setTimeout(() => setShowCheckInSuccess(false), 3000);
      
      // Update the mood data with new entry
      const newMoodData = [...moodData];
      newMoodData.push({ day: "Today", mood: selectedMood });
      if (newMoodData.length > 7) newMoodData.shift();
      setMoodData(newMoodData);
      
      // Reset selection
      setSelectedMood(null);
    }
  };

  // Determine wellness status based on score
  const getWellnessStatus = (score: number) => {
    if (score >= 80) return { status: "Excellent", color: "text-wellness-excellent" };
    if (score >= 60) return { status: "Good", color: "text-wellness-good" };
    if (score >= 40) return { status: "Fair", color: "text-wellness-fair" };
    return { status: "Needs Attention", color: "text-wellness-needs-attention" };
  };

  const wellnessStatus = getWellnessStatus(userData.wellnessScore);

  const moodEmojis = [
    { src: moodVerySad, alt: "Very sad", value: 1, label: "Very Sad" },
    { src: moodSad, alt: "Sad", value: 2, label: "Sad" },
    { src: moodNeutral, alt: "Neutral", value: 3, label: "Neutral" },
    { src: moodGood, alt: "Good", value: 4, label: "Good" },
    { src: moodExcellent, alt: "Excellent", value: 5, label: "Excellent" },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-2xl font-bold text-foreground">Wellness Tracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-accent text-accent-foreground text-xs font-medium px-2.5 py-0.5 rounded-full">
              {userData.streak} day streak
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-wellness flex items-center justify-center text-white font-semibold">
              {userData.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Wellness Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{userData.wellnessScore}</span>
                <span className="text-muted-foreground ml-1">/100</span>
              </div>
              <p className={`mt-1 font-medium ${wellnessStatus.color}`}>{wellnessStatus.status}</p>
              <div className="mt-4 w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-gradient-wellness h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${userData.wellnessScore}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Last Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-lg font-semibold">{userData.lastCheckIn}</span>
              </div>
              <p className="mt-2 text-muted-foreground">You've been consistent with your check-ins!</p>
              <Button className="mt-4 w-full" variant="outline">View History</Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: "hsl(var(--primary))" }} 
                      activeDot={{ r: 6, fill: "hsl(var(--primary))" }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                Improving this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mood Check-in Section */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>
              Your daily check-in helps us understand your emotional state and provide better support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showCheckInSuccess ? (
              <div className="bg-wellness-excellent/10 border border-wellness-excellent/20 rounded-lg p-4 text-center">
                <div className="text-wellness-excellent font-medium">Thank you for your check-in!</div>
                <p className="text-wellness-excellent/80 text-sm mt-1">Your response has been recorded.</p>
              </div>
            ) : (
              <>
                <RadioGroup 
                  className="flex justify-between my-6" 
                  onValueChange={handleMoodSelection}
                  value={selectedMood?.toString() || ""}
                >
                  {moodEmojis.map((emoji) => (
                    <div key={emoji.value} className="flex flex-col items-center">
                      <RadioGroupItem value={emoji.value.toString()} id={`mood-${emoji.value}`} className="sr-only" />
                      <Label htmlFor={`mood-${emoji.value}`} className="flex flex-col items-center cursor-pointer">
                        <div className={`p-2 rounded-full transition-all duration-300 ${
                          selectedMood === emoji.value 
                            ? 'bg-primary/20 scale-110' 
                            : 'hover:bg-muted scale-100'
                        }`}>
                          <img 
                            src={emoji.src} 
                            alt={emoji.alt} 
                            className="h-12 w-12"
                          />
                        </div>
                        <span className="mt-2 text-sm font-medium">{emoji.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button 
                  className="w-full mt-4" 
                  onClick={submitMoodCheckIn}
                  disabled={selectedMood === null}
                >
                  Submit Check-in
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        <h2 className="text-xl font-semibold mb-4">Personalized Wellness Recommendations</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
          {wellnessResources.map((resource, index) => (
            <Card key={index} className="flex flex-col shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className="p-2 bg-accent rounded-lg text-primary mr-3">
                    {resource.icon}
                  </div>
                  <CardTitle className="text-md">{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{resource.description}</p>
                <Button variant="outline" className="w-full mt-4">
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wellness Resources */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Wellness Resources</CardTitle>
            <CardDescription>
              Access tools and strategies to support your mental health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Coping Strategies</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Deep breathing exercises for immediate stress relief</li>
                  <li>Progressive muscle relaxation technique</li>
                  <li>Mindful walking for mental clarity</li>
                  <li>Journaling to process emotions</li>
                </ul>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Campus Resources</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Student Counseling Center: Open 9AM-5PM Weekdays</li>
                  <li>24/7 Crisis Hotline: (555) 123-HELP</li>
                  <li>Peer Support Groups: Tuesdays at 6PM</li>
                  <li>Wellness Workshops: Weekly schedule available</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-card mt-12 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Student Wellness Platform. Your mental health matters.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentWellnessPlatform;