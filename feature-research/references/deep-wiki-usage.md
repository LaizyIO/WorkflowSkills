# MCP Deep Wiki Usage Guide

## What is MCP Deep Wiki?

MCP Deep Wiki is an agent-assisted tool connected to extensive documentation for frameworks, libraries, and technologies. It provides up-to-date, accurate implementation information by querying official documentation and community resources.

## When to Use Deep Wiki

### Ideal Use Cases

1. **Framework-Specific Implementation**
   - "How to implement authentication in FastAPI"
   - "React hooks best practices for 2024"
   - "Entity Framework Core migrations with PostgreSQL"

2. **API Documentation**
   - "Microsoft Graph API endpoints for sending emails"
   - "Stripe API for subscription management"
   - "GitHub REST API for pull request automation"

3. **Best Practices**
   - "Best practices for error handling in .NET Web APIs"
   - "TypeScript strict mode configuration"
   - "Docker multi-stage builds for Node.js"

4. **Code Examples**
   - "Show example of React useEffect with cleanup"
   - "Example of async/await error handling in JavaScript"
   - "Sample LINQ query with joins in C#"

5. **Configuration and Setup**
   - "How to configure CORS in ASP.NET Core"
   - "Vite configuration for React with TypeScript"
   - "PostgreSQL connection string format"

6. **Troubleshooting**
   - "Common causes of 'cannot read property of undefined' in React"
   - "How to debug Entity Framework SQL queries"
   - "CORS preflight request failures"

### When NOT to Use Deep Wiki

- **Project-Specific Questions**: Deep Wiki doesn't know about your specific codebase
- **Business Logic**: It won't know your business requirements
- **Already Documented in Code**: If your codebase has the answer, use Grep/Read instead

## How to Formulate Effective Queries

### Query Structure

**Format:** `[Action] + [Technology] + [Specific Context]`

### Good vs Bad Queries

#### ❌ Bad Queries (Too Vague)
- "authentication"
- "how to use React"
- "database"

#### ✅ Good Queries (Specific and Actionable)
- "How to implement JWT authentication in FastAPI with OAuth2"
- "React useContext best practices for global state management"
- "PostgreSQL full-text search with Entity Framework Core"

### Query Templates

#### Implementation How-To
```
"How to implement [feature] in [technology] with [specific requirement]"

Examples:
- "How to implement rate limiting in Express.js with Redis"
- "How to implement file uploads in .NET Core with validation"
- "How to implement pagination in React with infinite scroll"
```

#### Best Practices
```
"Best practices for [task] in [technology]"

Examples:
- "Best practices for error handling in async Python functions"
- "Best practices for SQL injection prevention in Node.js"
- "Best practices for React component composition"
```

#### Code Examples
```
"Show example of [pattern/feature] in [technology]"

Examples:
- "Show example of repository pattern in .NET Core"
- "Show example of React custom hook for API calls"
- "Show example of Docker Compose with PostgreSQL and Redis"
```

#### Configuration
```
"How to configure [feature] in [technology] for [use case]"

Examples:
- "How to configure TypeScript for strict mode with React"
- "How to configure Nginx as reverse proxy for .NET app"
- "How to configure ESLint for TypeScript and React"
```

#### Comparison
```
"Difference between [A] and [B] in [technology]"

Examples:
- "Difference between useMemo and useCallback in React"
- "Difference between IEnumerable and IQueryable in LINQ"
- "Difference between JWT and session-based auth"
```

#### Troubleshooting
```
"How to fix [error] in [technology]"
"Common causes of [problem] in [technology]"

Examples:
- "How to fix CORS errors in ASP.NET Core"
- "Common causes of memory leaks in React applications"
- "How to debug slow database queries in Entity Framework"
```

## Using Deep Wiki in Research Workflow

### Step 1: Identify Knowledge Gaps

Before querying, identify what you don't know:
- What framework features are you unfamiliar with?
- What's the recommended approach for this task?
- Are there security or performance considerations?

### Step 2: Formulate Specific Queries

Based on gaps, create targeted queries:

**Example Research Scenario: "Implement Email Notifications"**

Knowledge Gaps:
- How to send emails in .NET?
- What email service to use?
- How to queue emails for reliability?

Queries:
1. "How to send emails using Microsoft Graph API in .NET Core"
2. "Best practices for email queueing in ASP.NET Core"
3. "Comparison between SendGrid and Microsoft Graph for email sending"

### Step 3: Validate Information

After receiving Deep Wiki responses:
- ✅ Verify it applies to your framework version
- ✅ Check if it aligns with your project architecture
- ✅ Consider security and performance implications
- ✅ Test in a POC if uncertain

### Step 4: Document References

In your findings document, reference Deep Wiki queries:

```markdown
## References

### MCP Deep Wiki Queries
1. **Email Sending in .NET**
   - Query: "How to send emails using Microsoft Graph API in .NET Core"
   - Finding: Microsoft Graph requires Azure AD app registration
   - Relevance: We already use Azure AD, so integration is straightforward

2. **Email Queueing**
   - Query: "Best practices for email queueing in ASP.NET Core"
   - Finding: Hangfire recommended for background job processing
   - Relevance: Provides reliability and retry logic
```

## Advanced Deep Wiki Usage

### Chaining Queries

Start broad, then narrow down:

1. **Initial Query:** "Email notification systems in .NET Core"
   - Learn about available options

2. **Follow-up Query:** "How to implement Hangfire with .NET Core for email queueing"
   - Get specific implementation details

3. **Detail Query:** "Hangfire best practices for error handling and retries"
   - Understand edge cases and reliability

### Multi-Technology Queries

When integrating multiple technologies:

**Example: React Frontend + .NET Backend**

1. "How to implement file uploads in React with drag and drop"
2. "How to handle multipart form data in ASP.NET Core Web API"
3. "Best practices for file validation on frontend and backend"

### Version-Specific Queries

Always specify versions when relevant:

- ❌ "React hooks tutorial"
- ✅ "React 18 hooks best practices"

- ❌ "Entity Framework migrations"
- ✅ "Entity Framework Core 8 code-first migrations"

## Interpreting Deep Wiki Responses

### What to Look For

1. **Code Examples**: Adapt to your project's style
2. **Configuration Settings**: Verify compatibility with your setup
3. **Dependencies**: Note required packages/libraries
4. **Warnings**: Pay attention to security, performance, or compatibility warnings
5. **Alternatives**: Consider mentioned alternatives

### What to Question

- **Outdated Information**: Is this for the latest version?
- **Overly Complex**: Is there a simpler approach?
- **Missing Context**: Does this apply to my use case?
- **Security**: Are there security implications not mentioned?

## Example Research Session

### Scenario: Implementing Real-Time Notifications

**User Request:** "Add real-time notifications when form submissions occur"

**Research Process:**

1. **Initial Understanding Query**
   - Query: "Real-time notification patterns in web applications"
   - Response: Learn about WebSockets, Server-Sent Events, and polling
   - Decision: Need to choose approach

2. **Technology-Specific Query**
   - Query: "How to implement SignalR in ASP.NET Core for real-time notifications"
   - Response: SignalR setup, hub configuration, client integration
   - Decision: SignalR is well-integrated with .NET

3. **Frontend Integration Query**
   - Query: "How to integrate SignalR with React TypeScript"
   - Response: @microsoft/signalr package, connection management
   - Decision: Straightforward integration

4. **Best Practices Query**
   - Query: "SignalR best practices for authentication and scaling"
   - Response: JWT bearer tokens, Redis backplane for scaling
   - Decision: Use existing JWT auth, plan for future scaling

5. **Document Findings**
   ```markdown
   ## Design Decision: Real-Time Notifications

   **Chosen Approach:** SignalR with Redis backplane

   **Rationale:**
   - Native .NET Core integration
   - Supports JWT authentication (already in use)
   - Scales with Redis backplane
   - Well-documented React client

   **Deep Wiki Queries Consulted:**
   1. Real-time notification patterns
   2. SignalR implementation in ASP.NET Core
   3. SignalR React TypeScript integration
   4. SignalR scaling and authentication
   ```

## Tips for Maximum Effectiveness

1. **Be Specific**: Include technology names, versions, and context
2. **Ask Follow-ups**: Don't hesitate to refine queries based on responses
3. **Cross-Reference**: Validate Deep Wiki info with your codebase patterns
4. **Document Queries**: Keep track of useful queries and responses
5. **Test in POC**: Validate uncertain information through proof-of-concept
6. **Version-Aware**: Always consider if information applies to your versions
7. **Security-Conscious**: Always ask about security implications
8. **Performance-Aware**: Consider performance impacts of recommendations

## Common Pitfalls to Avoid

1. **Over-Reliance**: Don't blindly follow without understanding
2. **Version Mismatch**: Applying old patterns to new versions
3. **Context Ignorance**: Ignoring your project's specific constraints
4. **Copy-Paste**: Adapt examples to your codebase style
5. **Incomplete Research**: Not asking about edge cases and error handling

## Quick Reference: Query Starters

- "How to implement [X] in [Technology]"
- "Best practices for [X] in [Technology]"
- "Show example of [Pattern] in [Technology]"
- "How to configure [X] for [Use Case]"
- "Difference between [A] and [B]"
- "Common causes of [Problem]"
- "How to optimize [X] for performance"
- "Security considerations for [X]"
- "How to test [X] in [Technology]"
- "Migration guide from [Old] to [New]"
