export interface BugModel {
  issues: Bug[];
}

export interface Bug {
  comments: number;
  votes: number;
  id: number;
  description: string;
  user: User;
  status: Status;
  summary: string;
  tags: Tag[];
}

interface User {
  email: string;
}

interface Status {
  name: string;
  is_closed: number;
}

interface Tag {
  name: string;
}

export interface Tags {
  tags: Tag[];
}