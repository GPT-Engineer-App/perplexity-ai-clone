import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import "./App.css";
import ChatInterface from './components/ChatInterface';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ChatInterface />
  );
}

export default App;
