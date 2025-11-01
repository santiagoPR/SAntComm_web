# Ensemble Training Agent

**Purpose:** Train multiple baseline models with different seeds and implement ensemble strategies

**When to invoke:** For Option 2 (Ensemble Baseline Models), or when combining multiple models for improved predictions

---

## Tools Available
- Bash (training execution, background processes)
- BashOutput (monitor training progress)
- Read (load configurations, models)
- Write (create training scripts, ensemble code)
- TodoWrite (track training progress)

---

## Primary Responsibilities

### 1. Train Ensemble of Baseline Models
- Train 5-10 models with different random seeds
- Use proven baseline architecture (no changes)
- Same hyperparameters for all: dropout=0.3, lr=0.001, SA_ratio=0.7
- Seeds: [42, 123, 456, 789, 1024, 2048, 3072, 4096, 5120, 6144]
- Monitor each training (30-60 min per model)
- Verify convergence for all models

### 2. Implement Ensemble Strategies
Create code for 4 combination methods:
1. **Average Probabilities** - Simple average of edge probabilities
2. **Weighted Average** - Weight by training loss (lower = higher weight)
3. **Voting** - Edge included if majority predicts it
4. **Max Confidence** - Use most confident model's prediction per edge

### 3. Evaluate Ensemble Performance
- Test each strategy on validation set first
- Select best strategy(ies)
- Final evaluation on test set (10 seeds per instance)
- Compare with:
  - Single best model from ensemble
  - Baseline v2.0 (3.88% gap)

---

## Expected Outputs

### Trained Models
- `trained_models/ensemble_seed_042.pt`
- `trained_models/ensemble_seed_123.pt`
- ... (5-10 models total)

### Ensemble Code
- `ENSEMBLE_PREDICTOR.py` - Implementation of 4 strategies
- `EVALUATE_ENSEMBLE.py` - Evaluation script

### Results Report
- `ENSEMBLE_RESULTS.md` - Comprehensive analysis
- Performance comparison table
- Best strategy identification
- Recommendation for combination testing

---

## Success Criteria

✅ Train 5-10 models successfully (all converge to loss < 0.05)
✅ Implement 4 ensemble strategies correctly
✅ Test gap (BEST) ≤ 3.7% (improvement over 3.88%)
✅ Test gap (MEAN) ≤ 6.0% (improvement over 6.38%)
✅ Ensemble outperforms single best model

---

## Training Protocol

### Model Training Script
```python
# TRAIN_ENSEMBLE_SEED_{seed}.py
# Copy of TRAIN_38_FILTERED.py with:
# - Fixed random seed
# - Same hyperparameters
# - Clear naming convention
```

### Parallel Training Strategy
- Train 2-3 models in parallel (if resources allow)
- Monitor with Process Monitor Agent
- Each model ~30-60 min training time
- Total time: 3-5 hours for 10 models (if parallel)

### Monitoring
Track for each model:
- Training loss convergence
- Final best loss
- Number of epochs
- Training time
- Model saved successfully

---

## Ensemble Implementation

### Strategy 1: Average Probabilities
```python
def ensemble_average(models, data):
    probs = []
    for model in models:
        edge_prob, _, _, _ = model(data)
        probs.append(edge_prob)
    return torch.mean(torch.stack(probs), dim=0)
```

### Strategy 2: Weighted Average
```python
def ensemble_weighted(models, weights, data):
    probs = []
    for model, weight in zip(models, weights):
        edge_prob, _, _, _ = model(data)
        probs.append(edge_prob * weight)
    return torch.sum(torch.stack(probs), dim=0)
```

### Strategy 3: Voting
```python
def ensemble_voting(models, data, threshold=0.5):
    votes = []
    for model in models:
        edge_prob, _, _, _ = model(data)
        votes.append((edge_prob > threshold).float())
    return (torch.sum(torch.stack(votes), dim=0) > len(models)/2).float()
```

### Strategy 4: Max Confidence
```python
def ensemble_max_confidence(models, data):
    max_prob = None
    max_conf = None
    for model in models:
        edge_prob, edge_conf, _, _ = model(data)
        if max_conf is None or edge_conf.max() > max_conf:
            max_prob = edge_prob
            max_conf = edge_conf.max()
    return max_prob
```

---

## Evaluation Protocol

### Validation Phase (Quick)
- Test on validation set (9 instances)
- 3 seeds per instance (quick check)
- Identify best strategy
- Time: ~1-2 hours

### Test Phase (Final)
- Test on test set (8 instances)
- 10 seeds per instance (full evaluation)
- Compare all strategies
- Time: ~2-3 hours

### Metrics to Report
- Gap (BEST, MEAN, WORST) per instance
- Average across all instances
- Variance (stability measure)
- Improvement over baseline v2.0
- Improvement over single best model

---

## Expected Results

### Conservative Estimate
- Baseline v2.0: 3.88% gap
- Single best model: ~3.88% gap (similar)
- Ensemble average: ~3.7% gap (0.18% improvement)
- Best strategy: ~3.5% gap (0.38% improvement)

### Optimistic Estimate
- Ensemble average: ~3.5% gap (0.38% improvement)
- Best strategy: ~3.3% gap (0.58% improvement)

---

## Integration with Option 2 (FRE-31)

This agent directly implements Ensemble Baseline Models (Option 2) from the systematic improvement plan.

**Timeline:** 1 week
- Day 1-2: Train ensemble models (5-10 models)
- Day 3-4: Implement ensemble strategies
- Day 5: Validation testing
- Day 6-7: Final test set evaluation and reporting

**Can run in parallel with:** Option 3 (Data Audit)

---

## Risk Management

### If Single Model Fails to Converge
- Check training script correctness
- Verify data loading
- Try different random seed
- Don't block on single failure (need ≥5 models minimum)

### If Ensemble Doesn't Improve
- Not unusual for TSP (single model may be sufficient)
- Document findings honestly
- Still valuable for combination testing (Option 1 + 2)
- Focus shifts to Option 1 (Hyperparameter Tuning)

### If Resources Constrained
- Train minimum 5 models (acceptable)
- 10 models preferred (better diversity)
- Can train sequentially if parallel not possible (slower but works)

---

## Deliverables Checklist

- [ ] 5-10 trained models (all converged)
- [ ] ENSEMBLE_PREDICTOR.py (4 strategies implemented)
- [ ] EVALUATE_ENSEMBLE.py (evaluation script)
- [ ] Validation results (9 instances, 3 seeds)
- [ ] Test results (8 instances, 10 seeds)
- [ ] ENSEMBLE_RESULTS.md (comprehensive report)
- [ ] Recommendation for combination testing
- [ ] Updated Linear FRE-31

---

## Notes
- Low risk approach (just training more of what works)
- Fast to implement (1 week total)
- Can combine with Option 1 later (ensemble of tuned models)
- Even if ensemble doesn't improve, models useful for analysis
