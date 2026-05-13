import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to CMSC127 Project</CardTitle>
          <CardDescription>This is a simple demo using shadcn/ui components.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <Button className="w-full" onClick={() => alert(`Hello, ${name || 'Friend'}!`)}>
            Say Hello
          </Button>
          {name && (
            <p className="text-sm text-muted-foreground">
              Welcome aboard, <span className="font-semibold text-foreground">{name}</span>!
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
