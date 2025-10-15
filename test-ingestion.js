// Test script for the data ingestion endpoint
// Run with: node test-ingestion.js

const API_KEY= 'pk_test_zXcUOsJjykpUnBgYiSeGiktXPNFzQYsikbCLYSbCjMbBJPWbCosmcITQJyjpLGKU'; // Replace with actual API key from your Better Auth setup
const BASE_URL = 'http://localhost:3000'; // Adjust if needed

const testData = {
  tool_calls: [
    {
      cost_usd: 0.123,
      execution_id: "execution_123",
      execution_time_ms: 123,
      input_tokens: 12,
      output_tokens: 123,
      prompt_id: "prompt_123",
      status: "OK",
      tool_call_id: "tool_call_123",
      tool_call_timestamp: "2025-10-15T10:11:12Z",
      tool_name: "my_tool",
      error_message: null
    }
  ],
  prompt_metadata: [
    {
      account_id: "acc_123",
      created_at: "2025-10-15T10:00:00Z",
      description: "A sample prompt for testing.",
      is_active: 1,
      name: "Sample Prompt",
      organization_id: "org_456",
      prompt_id: "prompt_789",
      prompt_text: "This is a sample prompt text.",
      updated_at: "2025-10-15T08:00:00Z",
      version: "1.0"
    }
  ],
  prompt_executions: [
    {
      account_id: "acc123",
      cost_usd: 0.123,
      execution_id: "exec456",
      execution_time_ms: 150,
      execution_timestamp: "2025-10-15T10:00:00Z",
      model: "gpt-3.5-turbo",
      organization_id: "org789",
      prompt_id: "prompt101",
      prompt_name: "Summarize",
      prompt_version: "v1",
      region: "us-east-1",
      request_tokens: 100,
      response_tokens: 50,
      session_id: "sess112",
      status: "success",
      error_message: null
    }
  ]
};

async function testIngestion() {
  try {
    console.log('Testing data ingestion endpoint...');
    console.log('Sending data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(`${BASE_URL}/api/ingest`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Test passed! Data ingested successfully.');
    } else {
      console.log('❌ Test failed!', result.error);
    }
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Run the test
testIngestion();
