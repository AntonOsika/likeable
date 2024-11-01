import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, chatHistory } = await req.json();

    // Convert chat history to OpenAI message format
    const messages = [
      { 
        role: 'system', 
        content: 'You are a helpful assistant that generates HTML code based on user prompts. Always wrap your HTML code in ```html and ``` tags.'
      },
      ...chatHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: prompt }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);
    
    const generatedText = data.choices[0].message.content;
    const htmlMatch = generatedText.match(/```html\n([\s\S]*?)\n```/);
    const extractedHtml = htmlMatch ? htmlMatch[1] : null;

    return new Response(JSON.stringify({ 
      fullResponse: generatedText,
      htmlCode: extractedHtml 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-html function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});