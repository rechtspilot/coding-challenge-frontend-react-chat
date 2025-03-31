import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

type NewSessionResponse ={
    sessionId: string;
}

type SendMessagePayload = {
    sessionId: string;
    message: {
        id: string;
        text: string;
    };
}

type GetMessagesParams = {
    sessionId: string;
    
}
type MessageData = {
    id: string;
    kind: 'robot' | 'user';
    text: string;
}

app.use(express.json());

const activeSessions: Set<string> = new Set();
const sessionMessages: { [sessionId: string]: any[] } = {};

app.post('/sessions', (req: Request, res: Response<NewSessionResponse>) => {
    const newSessionId = uuidv4();
    activeSessions.add(newSessionId); // Optional: track active sessions
    console.log(`[/sessions] New session created: ${newSessionId}`);
    res.status(201).json({ sessionId: newSessionId });
});

app.get('/sessions', (req: Request, res: Response<NewSessionResponse[]>) => {
    console.log(`[/sessions] Fetching active sessions`);
    const sessionsArray = Array.from(activeSessions).map(sessionId => ({ sessionId }));
    console.log(`[/sessions] Found ${sessionsArray.length} active sessions.`);
    res.status(200).json(sessionsArray);
});

app.post('/messages', (req: Request<{}, any, SendMessagePayload>, res: Response<string>) => {
    const { sessionId, message } = req.body;

    console.log(`[/messages] Received message for session ${sessionId}: "${message.text}" (frontendId: ${message.id})`);

    // Check for missing data
    if (!sessionId || !message || !message.text || !message.id) {
        console.log(`[/messages] Bad request: Missing data.`);
        res.status(400).send("Bad request: Missing data.");
        return;
    }

    // Check if session exists
    if (!activeSessions.has(sessionId)) {
        console.log(`[/messages] Forbidden: Session ID ${sessionId} not found.`);
        res.status(404).send("Session ID not found.");
        return;
    }

    const randomOutcome = Math.random(); // Value between 0 and 1
    const delay = 500 + Math.random() * 1500; // Simulate variable network latency (0.5s to 2s)

    if (randomOutcome < 0.6) {
        // Success case
        console.log(`[/messages] Simulating SUCCESS for message ${message.id} after ${delay.toFixed(0)}ms.`);
        setTimeout(() => {
            if (!sessionMessages[sessionId]) sessionMessages[sessionId] = [];
            
            // Add user message
            sessionMessages[sessionId].push({ 
                ...message, 
                backendId: uuidv4(), 
                timestamp: new Date() 
            });
            
            // Add robot response
            sessionMessages[sessionId].push({ 
                id: uuidv4(),
                kind: 'robot', 
                text: `Auto-response to: ${message.text}`,
                backendId: uuidv4(), 
                timestamp: new Date() 
            });
            
            console.log(`[/messages] Responding SUCCESS for message ${message.id}`);
            res.status(200).send("Message sent successfully.");
            return;
        }, delay);

    } else if (randomOutcome < 0.8) {
        // 20% chance of Explicit Failure
        console.log(`[/messages] Simulating FAILURE for message ${message.id} after ${delay.toFixed(0)}ms.`);
        setTimeout(() => {
            console.log(`[/messages] Responding FAILURE for message ${message.id}`);
            res.status(500).send("Internal server error.");
            return;
        }, delay);

    } else {
        // 20% chance of Timeout (Server simply doesn't respond)
        console.log(`[/messages] Simulating TIMEOUT for message ${message.id}. No response will be sent.`);
        
        setTimeout(() => {
            console.log(`[/messages] (Late response after timeout simulation for ${message.id} - client should have already timed out)`);
            res.status(504).send("Gateway timeout.");
            return;
        }, 30000); // e.g., 30 seconds, much longer than client timeout
    }
});

app.get('/messages/:sessionId', (req: Request<GetMessagesParams>, res: Response<MessageData[] | string>) => {
    const { sessionId } = req.params;
    console.log(`[/messages/${sessionId}] Fetching messages for session ${sessionId}`);

    // Check if session exists
    if (!activeSessions.has(sessionId)) {
        console.log(`[/messages] Forbidden: Session ID ${sessionId} not found.`);
        res.status(404).send("Session ID not found.");
        return;
    }
    
    const messages = sessionMessages[sessionId] || [];
    console.log(`[/messages/${sessionId}] Found ${messages.length} messages.`);
    res.status(200).json(messages);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});