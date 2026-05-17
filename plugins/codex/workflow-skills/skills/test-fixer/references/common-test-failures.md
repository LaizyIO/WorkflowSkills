# Common Test Failures and Solutions

## Timeout Errors

**Symptom:** Test times out waiting for element/response

**Common Causes:**
- Service not running
- Slow operation
- Wrong selector (E2E)
- Incorrect wait condition

**Solutions:**
- Start all required services
- Increase timeout if legitimately slow
- Fix selector
- Use correct wait condition (visible, enabled, etc.)

## Assertion Failures

**Symptom:** Expected X but got Y

**Common Causes:**
- Logic error in implementation
- Wrong test expectation
- Data fixtures incorrect

**Solutions:**
- Debug logic step-by-step
- Verify test expectation is correct
- Check/fix data fixtures

## Connection Errors

**Symptom:** Cannot connect to service

**Common Causes:**
- Service not running
- Wrong port/URL
- Firewall blocking

**Solutions:**
- Start the service
- Fix URL in configuration
- Check firewall rules

## Authentication Errors (401/403)

**Symptom:** Unauthorized or Forbidden

**Common Causes:**
- Missing auth header
- Expired token
- Wrong credentials

**Solutions:**
- Add Authorization header
- Refresh token
- Use correct credentials

## Null/Undefined Errors

**Symptom:** Cannot read property of undefined

**Common Causes:**
- Missing data in response
- Wrong API response shape
- Database empty

**Solutions:**
- Add null checks
- Fix API to return correct shape
- Seed database with test data

## CORS Errors

**Symptom:** CORS policy blocked request

**Solutions:**
```csharp
// .NET
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
```

## Database Errors

**Symptom:** Cannot connect to database / Constraint violation

**Solutions:**
- Start database service
- Run migrations
- Fix connection string
- Check foreign key constraints

## Flaky Tests

**Symptom:** Test passes sometimes, fails other times

**Common Causes:**
- Race conditions
- Timing issues
- Shared state between tests

**Solutions:**
- Add proper waits (not fixed delays)
- Isolate test data
- Clean up after each test
