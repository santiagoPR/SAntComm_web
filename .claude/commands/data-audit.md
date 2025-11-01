# Data Audit Agent

**Purpose:** Perform comprehensive data quality audits for training data validation

**When to invoke:** Before major training experiments, when suspecting data issues, or as part of systematic improvement plans (Option 3)

---

## Tools Available
- Read (file reading)
- Bash (data processing commands)
- Grep (search for patterns)
- Glob (find files)
- Write (create reports)

---

## Primary Responsibilities

### 1. SA Exploration Quality Analysis
- Load all SA exploration JSON files
- Compute pairwise tour similarity (edge overlap)
- Analyze gap distribution (should see variety: 5%, 10%, 15%, etc.)
- Identify instances with poor diversity (>70% similarity)
- Flag near-duplicate tours

### 2. Optimal Tour Verification
- Load all optimal tour files from tsplib_clean_n800/raw/
- Verify tour costs match TSPLIB optimal costs
- Check for fallback tours (best SA used instead of true optimal)
- Validate tour format (permutation, no repeats, N cities)
- Compare with graph optimal_cost values

### 3. Training Distribution Analysis
- Analyze instance size distribution (N=16 to N=574)
- Compute positive/negative edge ratios per instance
- Identify extreme class imbalances (>200:1)
- Check for outliers or anomalies
- Verify balanced representation across sizes

### 4. Graph Feature Quality Check
- Load sample graph files from tsplib_graphs_n800/
- Check for NaN or infinite values
- Verify edge_attr dimensions (should be 30D)
- Validate node features (should be 2D coordinates)
- Spot-check feature computation correctness

---

## Expected Outputs

### Data Audit Report
Create comprehensive markdown report with:
- Executive summary (pass/fail per area)
- Detailed findings for each audit area
- Issue log (problems found with severity)
- Action plan (fixes needed)
- Validation script recommendations

### Deliverable Files
1. `DATA_AUDIT_REPORT.md` - Full analysis
2. `data_issues.json` - Machine-readable issue log
3. `validation_script.py` - Automated quality checks (if time permits)

---

## Success Criteria

✅ All SA explorations verified diverse (avg similarity < 70%)
✅ All optimal tours verified correct (match TSPLIB)
✅ Training distribution balanced (no extreme outliers)
✅ Graph features validated (no NaN/inf values)
✅ Clear action plan for any issues found

---

## Common Issues to Watch For

### SA Exploration Issues
- Too many near-duplicate tours (>70% edge overlap)
- Insufficient diversity (all tours have similar gaps)
- Missing explorations for some instances
- Corrupted JSON files

### Optimal Tour Issues
- Tour cost doesn't match TSPLIB optimal
- Fallback "best SA" used instead of true optimal
- Invalid tour format (wrong number of cities, repeats)
- Missing .opt.tour files

### Distribution Issues
- Extreme class imbalance (>200:1 negative:positive)
- Heavily skewed toward small or large instances
- Outlier instances that don't fit training distribution
- Missing instances from expected dataset

### Feature Issues
- NaN or infinite values in edge_attr or node features
- Wrong dimensions (not 30D edge, not 2D node)
- Unnormalized features with extreme ranges
- Incorrect distance calculations

---

## Example Workflow

```bash
# 1. Check SA exploration diversity
for file in sa_exploration_data_61_instances/*_sa_explorations.json; do
    # Load and analyze tours
    # Compute pairwise similarity
    # Check gap distribution
done

# 2. Verify optimal tours
for file in tsplib_clean_n800/raw/*.opt.tour; do
    # Parse tour
    # Compute cost
    # Compare with graph optimal_cost
done

# 3. Analyze training distribution
# Load train_val_test_split_filtered_n600.json
# Compute statistics per instance
# Identify outliers

# 4. Check graph features
for file in tsplib_graphs_n800/*_graph.pt; do
    # Load graph
    # Check for NaN/inf
    # Verify dimensions
done
```

---

## Reporting Format

### Executive Summary
```
DATA AUDIT RESULTS - [PASS/FAIL]

1. SA Exploration Quality: [PASS/FAIL]
   - Issues found: X
   - Action required: [YES/NO]

2. Optimal Tour Verification: [PASS/FAIL]
   - Issues found: X
   - Action required: [YES/NO]

3. Training Distribution: [PASS/FAIL]
   - Issues found: X
   - Action required: [YES/NO]

4. Graph Feature Quality: [PASS/FAIL]
   - Issues found: X
   - Action required: [YES/NO]

OVERALL: [PASS/FAIL]
RECOMMENDATION: [Continue/Fix issues first]
```

---

## Integration with Option 3 (FRE-32)

This agent directly implements the Data Quality Audit (Option 3) from the systematic baseline improvement plan. Results inform:
- Whether to proceed with Option 1 (Hyperparameter Tuning)
- Whether data needs cleaning/regeneration
- Baseline performance ceiling explanations

**Timeline:** 1 week (Day 1-2: SA, Day 3-4: Optimal, Day 5: Distribution, Day 6: Features, Day 7: Report)

---

## Notes
- Be thorough but efficient (1 week timeline)
- Flag issues clearly (severity: CRITICAL/HIGH/MEDIUM/LOW)
- Provide actionable recommendations
- Create validation script for future use
