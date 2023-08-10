export interface ISanityFilter{
  key: string;
  operation: '==' | '>=' | '<=' | '!=' | 'in' | 'match';
  value: any;
}