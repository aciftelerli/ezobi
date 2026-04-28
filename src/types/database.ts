export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:         string;
          email:      string | null;
          full_name:  string | null;
          avatar_url: string | null;
          credits:    number;
          plan:       string;
          created_at: string;
        };
        Insert: {
          id:          string;
          email?:      string | null;
          full_name?:  string | null;
          avatar_url?: string | null;
          credits?:    number;
          plan?:       string;
          created_at?: string;
        };
        Update: {
          email?:      string | null;
          full_name?:  string | null;
          avatar_url?: string | null;
          credits?:    number;
          plan?:       string;
        };
      };
      stories: {
        Row: {
          id:         string;
          user_id:    string;
          child_name: string;
          interests:  string[];
          fears:      string[] | null;
          lesson:     string | null;
          title:      string | null;
          content:    string | null;
          audio_url:  string | null;
          pdf_url:    string | null;
          status:     string;
          created_at: string;
        };
        Insert: {
          id?:        string;
          user_id:    string;
          child_name: string;
          interests:  string[];
          fears?:     string[] | null;
          lesson?:    string | null;
          title?:     string | null;
          content?:   string | null;
          audio_url?: string | null;
          pdf_url?:   string | null;
          status?:    string;
          created_at?: string;
        };
        Update: {
          title?:     string | null;
          content?:   string | null;
          audio_url?: string | null;
          pdf_url?:   string | null;
          status?:    string;
        };
      };
      payments: {
        Row: {
          id:                    string;
          user_id:               string;
          lemon_order_id:        string | null;
          lemon_subscription_id: string | null;
          plan:                  string | null;
          credits_added:         number;
          amount_cents:          number | null;
          currency:              string;
          status:                string | null;
          created_at:            string;
        };
        Insert: {
          id?:                    string;
          user_id:                string;
          lemon_order_id?:        string | null;
          lemon_subscription_id?: string | null;
          plan?:                  string | null;
          credits_added?:         number;
          amount_cents?:          number | null;
          currency?:              string;
          status?:                string | null;
          created_at?:            string;
        };
        Update: {
          status?: string | null;
          plan?:   string | null;
        };
      };
    };
    Views:     Record<string, never>;
    Functions: Record<string, never>;
    Enums:     Record<string, never>;
  };
}