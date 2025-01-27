export interface Outage {
  id: string;
  start: Date;
  end: Date;
}

export interface Dependency {
  name: string
  healthy: boolean
  lastCheck: Date
}

export interface ServiceError {
  message: string,
  createdAt: Date
}

export interface UsageReport {
  /** CPU Usage percentage */
  cpu: number;
  /** Memory Usage as megabytes */
  mem: number;
  createdAt: Date;
}

export interface Service {
  id: string; 
  name: string;
  status: "OK" | "FAILED";
  uptime: number;
  req_count: number;
  err_count: number;
  last_successful_ping: Date;
  dependencies?: Dependency[];
  errors?: ServiceError[];
  outages?: Outage[];
  usage?: UsageReport[];
}