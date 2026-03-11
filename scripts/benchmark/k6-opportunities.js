import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 20,
  duration: "1m"
};

export default function () {
  const res = http.get(`${__ENV.API_URL || "http://localhost:4000"}/v1/opportunities`);
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
