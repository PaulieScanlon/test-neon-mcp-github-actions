import 'dotenv/config';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { createTransport, AnthropicChatAdapter } from '@smithery/sdk';
import Anthropic from '@anthropic-ai/sdk';
import WebSocket from 'ws';

global.WebSocket = WebSocket;

(async () => {
  try {
    const transport = createTransport('https://server.smithery.ai/neon', {
      neonApiKey: process.env.NEON_API_KEY,
    });

    const client = new Client({
      name: 'Test client',
      version: '1.0.0',
    });

    console.log('Connecting to transport...');
    await client.connect(transport);

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const anthropicAdapter = new AnthropicChatAdapter(client);

    console.log('Calling Anthropic API...');
    const anthropicResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8192,
      messages: [{ role: 'user', content: 'List my Neon projects' }],
      tools: await anthropicAdapter.listTools(),
    });

    const anthropicToolMessages = await anthropicAdapter.callTool(anthropicResponse);

    const data = JSON.parse(anthropicToolMessages[0].content[0].content[0].text);

    if (data) {
      data.forEach((item) => {
        console.log(`id: ${item.id}, name: ${item.name}`);
      });
    } else {
      console.log('No data');
    }

    process.exit(0);
  } catch (err) {
    console.error('An error occurred:', err);
    process.exit(1);
  }
})();
