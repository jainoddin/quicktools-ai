require('dotenv').config({ path: 'c:/Users/jain/.gemini/antigravity/scratch/quicktools-project/backend/.env' });
const mongoose = require('mongoose');

async function upgradeUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;
    
    const result = await db.collection('users').updateOne(
      { email: 'skn79302@gmail.com' },
      { $set: { plan: 'pro', credits: 10000 } }
    );
    
    console.log('Update result:', result);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

upgradeUser();
