export interface Outage {
  id: string;
  start: Date;
  end: Date;
}

export interface Service {
  id: string; 
  name: string;
  status: string;
  last_successful_ping: string;
  outages?: Outage[];
}