import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    constant_rate: {
      executor: 'constant-arrival-rate',
      rate: 7000, // 7000 requests per second
      timeUnit: '1s', // Base unit
      duration: '60s', // Total time of the test
      preAllocatedVUs: 300, // Virtual presigned users
      maxVUs: 20000 // Limit of virtual users
    }
  }
};

export default function () {
  const url = 'http://localhost:9000/mongo';

  const response = http.get(url);

  check(response, {
    'status es 200': r => r.status === 200,
    'tiempo de respuesta < 2000ms': r => r.timings.duration < 2000
  });
}
