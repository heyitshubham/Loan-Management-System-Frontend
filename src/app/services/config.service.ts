import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  get apiUrl(): string {
    return environment.apiUrl;
  }
  
  get isProduction(): boolean {
    return environment.production;
  }
  
  get appName(): string {
    return environment.appName;
  }
  
  get version(): string {
    return environment.version;
  }
  
  getApiEndpoint(path: string): string {
    return `${this.apiUrl}${path.startsWith('/') ? path : '/' + path}`;
  }
}