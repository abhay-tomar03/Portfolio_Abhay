import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('🔍 Fetching available models...\n');
    const models = await genAI.listModels();
    
    console.log('✅ Available Models:\n');
    models.models.forEach(model => {
      console.log(`📦 ${model.name}`);
    });
    
    console.log('\n✨ Models that support generateContent:');
    models.models.forEach(model => {
      const supportsGenerate = model.supportedGenerationMethods?.includes('generateContent');
      if (supportsGenerate) {
        console.log(`✅ ${model.name}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listModels();
