# Proof of Concept (POC) Creation Guidelines

## What is a POC?

A Proof of Concept is a minimal, throwaway implementation used to validate technical feasibility, test integration between components, or explore performance characteristics. POCs are NOT production code—they're learning tools.

## When to Create a POC

### ✅ Create a POC When:

1. **Technical Feasibility is Uncertain**
   - "Can we integrate library X with our existing stack?"
   - "Will approach Y work with our architecture?"
   - "Can we achieve performance target Z?"

2. **Testing New Technologies**
   - Evaluating a new framework or library
   - Testing an API before committing to it
   - Exploring a design pattern unfamiliar to the team

3. **Complex Integration**
   - Integrating multiple third-party services
   - Testing communication between components
   - Validating data flow through the system

4. **Performance Validation**
   - Will this approach scale to our requirements?
   - Can we meet latency targets?
   - How much resource usage is expected?

5. **User Requested Prototype**
   - User wants to see a working example
   - Need to validate user experience
   - Demonstrating concept for approval

### ❌ Don't Create a POC When:

1. **Implementation Path is Clear**
   - Similar features already exist in codebase
   - Documentation provides sufficient clarity
   - Standard, well-understood pattern

2. **Time Constraints**
   - Deadline is tight and feature is straightforward
   - POC would take longer than implementation

3. **User Explicitly Doesn't Need It**
   - User trusts the approach
   - User wants to proceed directly to implementation

4. **Trivial Features**
   - Adding a simple field to a form
   - Basic CRUD operation with existing patterns
   - Minor UI adjustments

## POC Creation Principles

### 1. Keep It Minimal

**Goal:** Validate the concept, not build production code

**What to Include:**
- ✅ Core functionality being tested
- ✅ Minimum code to make it work
- ✅ Hardcoded test data

**What to Skip:**
- ❌ Error handling (unless testing error scenarios)
- ❌ Edge case handling
- ❌ Production-ready validation
- ❌ UI polish and styling
- ❌ Comprehensive testing
- ❌ Configuration systems
- ❌ Authentication/authorization (unless testing auth)

**Example:**

```typescript
// ✅ GOOD POC CODE
async function testFileUpload() {
  const file = new File(["test"], "test.pdf");
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5001/api/files/upload", {
    method: "POST",
    body: formData
  });

  console.log("Upload result:", await response.json());
}

testFileUpload();
```

```typescript
// ❌ BAD POC CODE (over-engineered)
class FileUploadService {
  private readonly baseUrl: string;
  private readonly maxRetries: number;

  constructor(config: UploadConfig) {
    this.baseUrl = config.baseUrl;
    this.maxRetries = config.maxRetries;
  }

  async upload(file: File): Promise<UploadResult> {
    this.validateFile(file);
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await this.attemptUpload(file);
      } catch (error) {
        if (i === this.maxRetries - 1) throw error;
        await this.delay(1000 * Math.pow(2, i));
      }
    }
  }

  // ... 100+ lines of production code
}
```

### 2. Be Adaptive to Context

**Working Within Existing Project:**
- Create POC in a temporary branch: `poc/feature-name`
- Or create a scratch file: `src/poc_test.ts`
- Use existing project setup (no new project needed)
- Delete or archive after POC complete

**Starting From Scratch:**
- Create minimal standalone project
- Use simplest setup possible
- Don't overcomplicate with build tools

**Example: POC in Existing React Project**
```bash
# Create temporary branch
git checkout -b poc/email-notifications

# Create scratch component
touch src/components/EmailNotificationPOC.tsx

# Test it in App.tsx temporarily
# [implement minimal code]

# After validation
git checkout main
git branch -D poc/email-notifications
```

**Example: Standalone POC**
```bash
# Create minimal Node.js POC
mkdir poc-websocket-test
cd poc-websocket-test
npm init -y
npm install ws
echo "const WebSocket = require('ws');" > test.js
# [add minimal test code]
node test.js
```

### 3. Use Tools Available in Current Environment

Don't introduce unnecessary dependencies just for POC.

**If project uses:**
- React → Create React component for POC
- .NET → Create console app or test controller
- Python → Create simple .py script
- Go → Create simple .go file

**Avoid:**
- Installing new frameworks for POC
- Creating complex build pipelines
- Setting up Docker if not needed

## POC Structure

### Minimal File Structure

```
poc-feature-name/
├── README.md           # What is being tested and why
├── main.*              # Entry point (main.ts, index.js, Program.cs, etc.)
└── [minimal files]     # Only what's absolutely needed
```

### README.md Template

```markdown
# POC: [Feature Name]

## Purpose
[What are we validating?]

## Hypothesis
[What do we think will happen?]

## Test Scenario
[Specific scenario being tested]

## How to Run
```bash
[Command to run POC]
```

## Expected Outcome
[What should happen if it works]

## Actual Outcome
[What actually happened - fill after running]

## Findings
- [Finding 1]
- [Finding 2]

## Recommendations
- [Recommendation for production implementation]
```

## POC Workflow

### 1. Define POC Scope

Before writing code, answer:
- **What exactly am I validating?**
  - "Can I send emails via Microsoft Graph API?"
  - NOT "Build a complete email notification system"

- **What's the success criteria?**
  - "Email successfully sent and received"
  - "Response time under 100ms"
  - "Integration works with existing auth"

### 2. Create Minimal Implementation

Write the absolute minimum code to test hypothesis.

**Time Limit:** If POC takes >2 hours, it's not minimal enough.

### 3. Run and Observe

- Execute the POC
- Capture output/logs
- Note any errors or unexpected behavior
- Measure performance if relevant

### 4. Document Results

Update README.md with actual outcomes.

**Document:**
- ✅ Did it work? (Yes/No/Partially)
- ✅ What was learned?
- ✅ Any surprises or issues?
- ✅ Performance observations
- ✅ Recommendations for production

### 5. Clean Up

After documenting findings:
- Delete POC code (it's throwaway)
- Or archive in a `poc-archive/` directory
- Include key findings in research document
- Don't carry POC code into production

## POC Examples by Scenario

### Example 1: Testing API Integration

**Scenario:** Validate Stripe API integration

```javascript
// poc-stripe-integration/test.js
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_...');

async function testStripeCharge() {
  console.log("Testing Stripe charge...");

  try {
    const charge = await stripe.charges.create({
      amount: 1000, // $10.00
      currency: 'usd',
      source: 'tok_visa', // Test token
      description: 'POC Test Charge'
    });

    console.log("✅ Charge successful:", charge.id);
    console.log("Status:", charge.status);
    return true;
  } catch (error) {
    console.error("❌ Charge failed:", error.message);
    return false;
  }
}

testStripeCharge();
```

**Findings:**
- ✅ API integration works
- ✅ Response time: ~300ms
- ⚠️ Need to handle rate limiting in production
- ⚠️ Test mode tokens behave differently than production

### Example 2: Testing Performance

**Scenario:** Validate database query performance

```csharp
// poc-query-performance/Program.cs
using System;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

var sw = Stopwatch.StartNew();

using var db = new AppDbContext();

// Test Query 1: No pagination
var allRecords = db.Submissions.ToList();
Console.WriteLine($"Query 1 (no pagination): {sw.ElapsedMilliseconds}ms - {allRecords.Count} records");

sw.Restart();

// Test Query 2: With pagination
var pagedRecords = db.Submissions
    .OrderBy(s => s.SubmittedAt)
    .Skip(0)
    .Take(50)
    .ToList();
Console.WriteLine($"Query 2 (pagination): {sw.ElapsedMilliseconds}ms - {pagedRecords.Count} records");
```

**Findings:**
- ✅ Query 1: 2,300ms (too slow for UI)
- ✅ Query 2: 45ms (acceptable)
- 📌 Recommendation: Always use pagination in production

### Example 3: Testing Component Integration

**Scenario:** Validate React component with backend API

```tsx
// src/poc_file_upload.tsx
import React, { useState } from 'react';

function POCFileUpload() {
  const [status, setStatus] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5001/api/files/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setStatus(`✅ Uploaded: ${data.fileName}`);
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <p>{status}</p>
    </div>
  );
}

export default POCFileUpload;
```

**Findings:**
- ✅ File upload works
- ⚠️ CORS needs configuration
- ⚠️ No progress indicator (needed for large files)
- 📌 Recommendation: Add progress bar and CORS config

## Common POC Mistakes to Avoid

### 1. Over-Engineering

**Mistake:** Building production-quality POC
**Fix:** Remember it's throwaway code

### 2. Scope Creep

**Mistake:** Adding "just one more thing" repeatedly
**Fix:** Stick to original hypothesis

### 3. Skipping Documentation

**Mistake:** Not documenting findings
**Fix:** Fill out README.md immediately after testing

### 4. Keeping POC Code

**Mistake:** Reusing POC code in production
**Fix:** Delete POC, implement properly from scratch

### 5. No Clear Success Criteria

**Mistake:** "Let's just try it and see"
**Fix:** Define success criteria before coding

## POC Checklist

Before creating POC:
- [ ] Is POC really needed? (see "When to Create a POC")
- [ ] What specific hypothesis am I testing?
- [ ] What's the success criteria?
- [ ] Can I do this in <2 hours?

During POC creation:
- [ ] Am I writing minimal code?
- [ ] Am I skipping unnecessary features?
- [ ] Am I using existing project tools?

After POC completion:
- [ ] Did I document actual outcomes?
- [ ] Did I note findings and recommendations?
- [ ] Did I add key learnings to research document?
- [ ] Did I clean up/delete POC code?

## Quick Reference: POC Do's and Don'ts

### ✅ Do:
- Keep it minimal and focused
- Use hardcoded test data
- Document findings immediately
- Delete POC after learning
- Test one thing at a time
- Use existing project setup when possible

### ❌ Don't:
- Build production-ready code
- Add error handling unless testing errors
- Spend >2 hours on a POC
- Reuse POC code in production
- Test multiple hypotheses at once
- Introduce new dependencies for POC

## Conclusion

POCs are powerful learning tools when used correctly. They validate technical feasibility quickly without the overhead of production code. Remember: the goal is learning, not building.

**Golden Rule:** If you're spending time making your POC "clean" or "maintainable," you're doing it wrong. POCs are meant to be quick, dirty, and disposable.
