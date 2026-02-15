#!/bin/bash
# Performance benchmark: Compare sequential vs parallel scraping
# Run this script to test the performance improvements

echo "======================================"
echo "LEAD SCRAPING PERFORMANCE BENCHMARK"
echo "======================================"
echo ""
echo "Testing: 4000 Dentists in United States"
echo ""

# Set working directory
cd "$(dirname "$0")/.."

# Test 1: Sequential (Baseline)
echo "----------------------------------------"
echo "TEST 1: Sequential Scraping (Baseline)"
echo "----------------------------------------"
echo "Command: python3 execution/scrape_apify.py --query 'Dentist' --location 'United States' --max_items 4000 --no-email-filter"
echo ""
echo "Starting test..."
START_SEQUENTIAL=$(date +%s)

python3 execution/scrape_apify.py \
  --query "Dentist" \
  --location "United States" \
  --max_items 4000 \
  --no-email-filter \
  --output_prefix "dentist_baseline"

END_SEQUENTIAL=$(date +%s)
ELAPSED_SEQUENTIAL=$((END_SEQUENTIAL - START_SEQUENTIAL))

echo ""
echo "✅ Sequential test completed in ${ELAPSED_SEQUENTIAL}s ($(echo "scale=1; $ELAPSED_SEQUENTIAL/60" | bc) minutes)"
echo ""
echo "Waiting 10 seconds before next test..."
sleep 10

# Test 2: Parallel (4-way)
echo "----------------------------------------"
echo "TEST 2: Parallel Scraping (4-way split)"
echo "----------------------------------------"
echo "Command: python3 execution/scrape_apify_parallel.py --query 'Dentist' --location 'United States' --total_count 4000 --partitions 4 --no-email-filter"
echo ""
echo "Starting test..."
START_PARALLEL=$(date +%s)

python3 execution/scrape_apify_parallel.py \
  --query "Dentist" \
  --location "United States" \
  --total_count 4000 \
  --partitions 4 \
  --no-email-filter \
  --output_prefix "dentist_parallel"

END_PARALLEL=$(date +%s)
ELAPSED_PARALLEL=$((END_PARALLEL - START_PARALLEL))

echo ""
echo "✅ Parallel test completed in ${ELAPSED_PARALLEL}s ($(echo "scale=1; $ELAPSED_PARALLEL/60" | bc) minutes)"
echo ""

# Results Summary
echo "======================================"
echo "BENCHMARK RESULTS"
echo "======================================"
echo ""
echo "Sequential (baseline): ${ELAPSED_SEQUENTIAL}s ($(echo "scale=1; $ELAPSED_SEQUENTIAL/60" | bc) min)"
echo "Parallel (4-way):      ${ELAPSED_PARALLEL}s ($(echo "scale=1; $ELAPSED_PARALLEL/60" | bc) min)"
echo ""
echo "Time saved:            $((ELAPSED_SEQUENTIAL - ELAPSED_PARALLEL))s ($(echo "scale=1; ($ELAPSED_SEQUENTIAL - $ELAPSED_PARALLEL)/60" | bc) min)"
echo "Speedup factor:        $(echo "scale=2; $ELAPSED_SEQUENTIAL/$ELAPSED_PARALLEL" | bc)x"
echo "Improvement:           $(echo "scale=1; (($ELAPSED_SEQUENTIAL - $ELAPSED_PARALLEL) / $ELAPSED_SEQUENTIAL) * 100" | bc)%"
echo ""
echo "======================================"
