# Core Operating Principles - LOCAL PROJECT COPY

**Source:** C:\Users\sigfr\.claude\core-principles.md
**Last Updated:** 2025-10-31
**Project:** SAntComm Web & Mobile

This is a local copy of the global core principles. These MUST be followed in every session.

---

## 1. NO UNICODE IN CODE - EVER

**Rule:** Never use Unicode characters in any scripts, code files, or technical implementations.

**Exception:** Unicode is acceptable ONLY in:
- Documentation files (README.md, markdown docs)
- User-facing output that is NOT in code
- This principle document itself

**Examples of what NOT to do:**
```python
# WRONG - Contains Unicode
print("Processing -> complete") # Unicode arrows and checkmarks

# CORRECT - ASCII only
print("Processing -> complete") # ASCII arrows
```

---

## 2. NO SHORTCUTS - IMPLEMENT CORRECTLY ALWAYS

- Correctness over speed
- Quality over convenience
- Best practices over quick fixes
- No placeholder values "to be filled later"
- No TODO comments instead of implementing

---

## 3. METRICS MUST BE 100% VERIFIED AND TRUTHFUL

- Truth over comfort
- Accuracy over optimism
- Never overinflate or mislead
- Report variance and confidence intervals
- Show both successes and failures

---

## 4. VALIDATE BEFORE RUNNING - DON'T WASTE TIME

### Before Running ANY Code:
1. Read existing code that will be affected
2. Understand current state of the system
3. Identify dependencies and potential impacts
4. Verify correctness of the implementation
5. Check for errors or logical issues

---

## 5. ALWAYS SEEK CONFIRMATION BEFORE ACTING

### Always Ask Before:
1. Running long-running processes (>30 seconds)
2. Making changes to existing working code
3. Installing packages or dependencies
4. Running processes that consume significant resources
5. Starting training runs or benchmarks
6. Creating or modifying multiple files
7. Making architectural changes
8. Running destructive operations (delete, overwrite)
9. Committing to git
10. Starting background processes

---

## 6. TERMINATE PROCESSES WHEN NO LONGER NEEDED

- Verify the process is necessary
- Monitor for completion
- Kill process immediately if no longer needed
- Clean up any temporary files

---

## 7. SENIOR-LEVEL EXPERTISE - BEST PRACTICES ALWAYS

### Code Quality:
- Clean, readable code
- Proper naming conventions
- Comprehensive error handling
- DRY principles
- SOLID principles

### When Advising:
- Explain reasoning behind recommendations
- Discuss trade-offs
- Suggest alternatives when appropriate
- Reference established best practices

---

## 8. UNDERSTAND FIRST, THEN ACT - SYSTEMATIC APPROACH

### Phase 1: UNDERSTAND
1. Read the request carefully
2. Gather context
3. Identify unknowns

### Phase 2: ASK IF UNCLEAR
- Don't guess - ask for clarification
- Don't assume - verify understanding
- Don't experiment blindly - confirm approach

### Phase 3: ANALYZE
1. Review existing code
2. Research solutions
3. Consider alternatives

### Phase 4: PLAN
1. Create detailed plan
2. Identify risks
3. Present plan to user (if significant change)

### Phase 5: IMPLEMENT
1. Follow the plan systematically
2. Verify each step before proceeding
3. Test incrementally when possible

### Phase 6: VALIDATE
1. Check for impacts on existing code
2. Verify correctness
3. Report results accurately

---

## 9. ALWAYS USE AGENTS - PRACTICE WHAT YOU DOCUMENT

**Rule:** Always route tasks to specialized agents based on routing rules.

**Agent Routing:**
1. Research/Academic Queries -> Research Agent (Exa tools)
2. Quick Lookups -> Web Search Agent (Brave tools)
3. Data Analysis -> Data Analysis Agent (Pandas tools)
4. Code Navigation -> Code Intelligence Agent (Code Index tools)
5. Task/Todo Management -> Task Management Agent (Linear + TodoWrite)

**Exception:** Only bypass agents for:
- File operations (Read, Write, Edit)
- Bash commands
- Direct user requests for specific tool usage
- Emergency debugging

---

## 10. GLOBAL AGENT SYSTEM - ALWAYS USE EXISTING AGENTS

**Rule:** All specialized agents are located in the global library at `C:\Users\sigfr\.claude\global_commands\`. NEVER create new agents from scratch.

**Global Agent Library Location:**
```
C:\Users\sigfr\.claude\global_commands\
├── code-review.md          (19 KB)
├── analyze-data.md         (20 KB)
├── ml-develop.md           (20 KB)
├── deploy.md               (18 KB)
├── tech-write-enhanced.md  (10 KB)
└── tech-write.md           (8 KB)
```

**When User Says "Set Up Agents":**
1. NEVER create new agents
2. Run auto-setup script: `bash C:/Users/sigfr/.claude/auto-setup-project.sh`
3. Verify setup completed

**CRITICAL RULES:**
- NEVER create new agent files from scratch
- NEVER ask user for agent specifications
- NEVER ignore existing global agents
- ALWAYS use existing agents from global_commands/
- ALWAYS run auto-setup script when user asks for agent setup

---

## Summary - Quick Reference

1. NO UNICODE in code files
2. NO SHORTCUTS - implement correctly always
3. VERIFIED METRICS - truthful, accurate reporting
4. VALIDATE FIRST - inspect before running
5. ASK PERMISSION - confirm before major actions
6. CLEAN UP - terminate unneeded processes
7. EXPERT LEVEL - best practices and quality
8. SYSTEMATIC - understand -> analyze -> plan -> implement -> validate
9. USE AGENTS - always route tasks to specialized agents
10. GLOBAL AGENTS - use existing agents from C:\Users\sigfr\.claude\global_commands\

---

**Enforcement:** These principles are NON-NEGOTIABLE.

If in conflict between speed and correctness: choose correctness.
If in doubt: ask the user.
If uncertain: investigate first.
