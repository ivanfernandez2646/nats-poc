# Using k6 with InfluxDB

## Overview

This guide explains how to use `k6` with the InfluxDB output plugin built using [`xk6`](https://github.com/grafana/xk6-output-influxdb).

## Prerequisites

1. Generate an InfluxDB token through the InfluxDB UI.
2. Create two buckets in the InfluxDB UI to store different metrics.

## Example Token

Make sure to use a valid token generated via the InfluxDB UI. For example:

```
PMd7p8jkSxMjyiGF_9os4vAxIrj2JuQwUaKFqC5gF2cSdn0j3DrrTgvx9LoceXmBoNSKxCL0W0E-FDdlCDDwyg==
```

## Testing with k6 and InfluxDB

### Test NATS

Run the following command to test NATS with `k6`:

```bash
K6_INFLUXDB_ORGANIZATION=<myOrg> \
K6_INFLUXDB_BUCKET=<myBucket> \
K6_INFLUXDB_TOKEN=<myToken>> \
./k6 run -o xk6-influxdb=http://localhost:8086 nats-event-stress.ts
```

### Test MongoDB

Run the following command to test MongoDB with `k6`:

```bash
K6_INFLUXDB_ORGANIZATION=<myOrg> \
K6_INFLUXDB_BUCKET=<myBucket> \
K6_INFLUXDB_TOKEN=<myToken> \
./k6 run -o xk6-influxdb=http://localhost:8086 mongo-stress.ts
```

Replace the placeholders `<myOrg>`, `<myBucket>` and `<myToken>` with your actual InfluxDB organization, bucket and valid token.
