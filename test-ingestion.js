// Test script for the data ingestion endpoint
// Run with: node test-ingestion.js

const API_KEY= 'pk_test_zXcUOsJjykpUnBgYiSeGiktXPNFzQYsikbCLYSbCjMbBJPWbCosmcITQJyjpLGKU'; // Replace with actual API key from your Better Auth setup
const BASE_URL = 'http://localhost:3001'; // Adjust if needed

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
  ],
  test_runs: [
    {
      test_run_id: "test_run_123",
      prompt_id: "prompt_123",
      prompt_name: "Test Prompt",
      total_tests: 5,
      passed_tests: 4,
      failed_tests: 1,
      duration_ms: 2500,
      timestamp: "2025-01-15T10:00:00Z",
      environment: "ci",
      git_commit: "abc123",
      account_id: "acc_123",
      organization_id: "org_456"
    }
  ],
  test_cases: [
    {
      test_case_id: "test_case_123",
      test_run_id: "test_run_123",
      prompt_id: "prompt_123",
      input: "Test input for prompt",
      expected_output: "Expected output from prompt",
      actual_output: "Actual output from prompt",
      passed: true,
      duration_ms: 500,
      execution_id: "exec_123",
      error_message: null,
      timestamp: "2025-01-15T10:00:00Z"
    },
    {
      test_case_id: "test_case_124",
      test_run_id: "test_run_123",
      prompt_id: "prompt_123",
      input: "Another test input",
      expected_output: "Another expected output",
      actual_output: "Different actual output",
      passed: false,
      duration_ms: 300,
      execution_id: "exec_124",
      error_message: "Output mismatch",
      timestamp: "2025-01-15T10:01:00Z"
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
