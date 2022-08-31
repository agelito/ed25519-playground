# ed25519-playground

This project is for benchmarking and comparing various ed25519 implementations. 

So far the packages it compares and benchmarks is:
- ed25519
- @noble/ed25519
- tweetnacl

## Installing

```sh
git clone https://github.com/agelito/ed25519-benchmark.git && cd ed25519-benchmark
npm i
```

## Running
This will run the benchmarks and print the results:

```sh
npm start
```

## Testing
This will run the unit tests which mainly ensures the different implementations can verify
message signatures created by other implementations.

```sh
npm run test
```

## Performance Data
Here I'll list any know performance data I've collected so far.

### 2013-ish ASUS Laptop

| Propery | Value |
|---------|-------|
| OS | Arch Linux x86_64 |
| Kernel | 5.19.4-arch1-1|
| CPU | Intel i7-3610QM (8) @ 3.30Ghz |
| Memory | 15,954 MiB (16GB) |

#### Benchmark Results
| Package | Function | ops/sec | samples | deviation |
|---------|----------|---------|---------|-----------|
| ed25519 | signMessage | 20,611 | 92 | ±0.26% |
| ed25519 | verifySignature| 6,788 | 92 | ±0.64% |
| @noble/ed25519 | signMessage | 1,349 | 89 | ±2.05% |
| @noble/ed25519 | verifySignature | 285 | 88 | ±0.48% |
| tweetnacl | signMessage | 179 | 51 | ±4.67% |
| tweetnacl | verifySignature | 88.81 | 47 | ±4.01%  |

##### Raw Output

```
ed25519#signMessage x 20,611 ops/sec ±0.26% (92 runs sampled)
noble_ed25519#signMessage x 1,349 ops/sec ±2.05% (89 runs sampled)
tweetnacl#signMessage x 179 ops/sec ±4.67% (51 runs sampled)
ed25519#verifySignature x 6,788 ops/sec ±0.64% (92 runs sampled)
noble_ed25519#verifySignature x 285 ops/sec ±0.48% (88 runs sampled)
tweetnacl#verifySignature x 88.81 ops/sec ±4.01% (47 runs sampled)
┌───────────────────────────────┬────────────────────┬─────────┐
│            (index)            │         hz         │ samples │
├───────────────────────────────┼────────────────────┼─────────┤
│      ed25519#signMessage      │ 20610.651053945152 │   92    │
│   noble_ed25519#signMessage   │ 1349.1529799355142 │   89    │
│     tweetnacl#signMessage     │ 179.48662828702047 │   51    │
│    ed25519#verifySignature    │ 6788.212684341719  │   92    │
│ noble_ed25519#verifySignature │ 285.27586801774976 │   88    │
│   tweetnacl#verifySignature   │ 88.80920114852132  │   47    │
└───────────────────────────────┴────────────────────┴─────────┘
```