# Universal Debugging Strategies

## 1. Read Error Messages Carefully
- Error messages often contain exact problem and location
- Look for: file paths, line numbers, expected vs actual

## 2. Reproduce Locally
- Run single failing test in isolation
- Observe behavior step-by-step
- Add logging/breakpoints

## 3. Binary Search
- Narrow down problem area
- Comment out half the code
- Which half has the issue?
- Repeat until found

## 4. Rubber Duck Debugging
- Explain the code out loud
- Often reveals the issue

## 5. Check Assumptions
- Is service running?
- Is data correct?
- Are environment variables set?
- Is configuration correct?

## 6. Compare Working vs Failing
- What changed between working and failing?
- Can you revert to working state?
- What's different?

## 7. Add Logging
- Log inputs, outputs, intermediate values
- Trace execution path
- Identify where expectation diverges from reality

## 8. Simplify
- Remove complexity
- Test with minimal example
- Add back complexity gradually

## 9. Check Documentation
- Is API used correctly?
- Are there known issues?
- Examples in docs?

## 10. Take a Break
- Fresh eyes spot issues faster
- Come back after 15 minutes

## Framework-Specific Tips

**JavaScript/TypeScript:**
- console.log() liberally
- Use debugger; statement
- Check browser DevTools Network tab

**.NET:**
- Use Debug.WriteLine()
- Set breakpoints in Visual Studio
- Check Immediate Window

**Python:**
- Use print() or logging
- pdb.set_trace() for debugging
- Check stack traces carefully

**Go:**
- fmt.Println() for debugging
- Use delve debugger
- Check error returns

## Common Causes by Symptom

**Timeout:** Service not started, too slow, wrong wait condition
**Null/Undefined:** Missing data, wrong API response shape
**Connection Refused:** Service not running, wrong port
**401/403:** Auth issue, missing/expired token
**500:** Server error, check logs
**Assertion Failed:** Logic error or wrong expectation
