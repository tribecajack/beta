export interface Outage {
  id: string;
  start: Date;
  end: Date;
}

export interface Dependency {
  name: string
  status: "up" | "down" | "degraded"
}

export interface Service {
  id: string; 
  name: string;
  status: "up" | "down" | "degraded";
  version: string;
  uptime: number;
  requests: number;
  errors: number;
  memory: number;
  cpu: number;
  lastCheck: string;
  dependencies?: Dependency[];
  logs?: string[];
  outages?: Outage[];
}