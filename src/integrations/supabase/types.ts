export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ascii_conversions: {
        Row: {
          created_at: string
          id: number
          total_count: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          total_count?: number
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          total_count?: number
          type?: string
        }
        Relationships: []
      }
      badge_images: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          prompt: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          prompt: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          prompt?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string | null
          created_at: string
          excerpt: string | null
          id: number
          image_url: string | null
          read_time: number | null
          title: string | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: number
          image_url?: string | null
          read_time?: number | null
          title?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: number
          image_url?: string | null
          read_time?: number | null
          title?: string | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      channel_invitations: {
        Row: {
          accepted_at: string | null
          channel_id: string | null
          created_at: string
          created_by: string | null
          email: string
          id: string
          role: string
        }
        Insert: {
          accepted_at?: string | null
          channel_id?: string | null
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          role?: string
        }
        Update: {
          accepted_at?: string | null
          channel_id?: string | null
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_invitations_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_members: {
        Row: {
          channel_id: string | null
          created_at: string
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string
          id?: string
          role?: string
          user_id?: string | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      html_edits: {
        Row: {
          created_at: string
          html_content: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      image_generations: {
        Row: {
          created_at: string
          description: string | null
          generated_image_url: string | null
          id: number
          screenshot_url: string | null
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          generated_image_url?: string | null
          id?: number
          screenshot_url?: string | null
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          generated_image_url?: string | null
          id?: number
          screenshot_url?: string | null
          url?: string
        }
        Relationships: []
      }
      issues: {
        Row: {
          assignee_id: string | null
          channel_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string
          status: string
          team_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          channel_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          team_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          channel_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          status?: string
          team_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "issues_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      lovable: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      published_projects: {
        Row: {
          created_at: string
          html_content: string
          id: string
          project_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          project_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          project_name?: string
          user_id?: string
        }
        Relationships: []
      }
      twitter_predictions: {
        Row: {
          created_at: string
          id: number
          predictions: Json
          profile: Json
          twitter_handle: string
        }
        Insert: {
          created_at?: string
          id?: never
          predictions: Json
          profile: Json
          twitter_handle: string
        }
        Update: {
          created_at?: string
          id?: never
          predictions?: Json
          profile?: Json
          twitter_handle?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          channels: string[] | null
          created_at: string | null
          generated_posts: Json | null
          id: string
          message: string | null
          subreddits: Json | null
          subreddits_with_posts: Json | null
          updated_at: string | null
        }
        Insert: {
          channels?: string[] | null
          created_at?: string | null
          generated_posts?: Json | null
          id: string
          message?: string | null
          subreddits?: Json | null
          subreddits_with_posts?: Json | null
          updated_at?: string | null
        }
        Update: {
          channels?: string[] | null
          created_at?: string | null
          generated_posts?: Json | null
          id?: string
          message?: string | null
          subreddits?: Json | null
          subreddits_with_posts?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_team_with_admin: {
        Args: {
          team_name: string
          team_description: string
          user_id: string
        }
        Returns: undefined
      }
      increment_conversion_count: {
        Args: {
          conversion_type: string
        }
        Returns: undefined
      }
      increment_view_count: {
        Args: {
          post_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
