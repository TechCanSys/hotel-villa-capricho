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
      profiles: {
        Row: {
          created_at: string | null
          id: string
          role: "admin" | "user"
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: "admin" | "user"
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: "admin" | "user"
          updated_at?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          check_in: string
          check_out: string
          created_at: string | null
          email: string
          guests: number
          id: string
          message: string | null
          name: string
          phone: string
          price: number
          room_id: string | null
          room_name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string | null
          email: string
          guests: number
          id?: string
          message?: string | null
          name: string
          phone: string
          price: number
          room_id?: string | null
          room_name: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string | null
          email?: string
          guests?: number
          id?: string
          message?: string | null
          name?: string
          phone?: string
          price?: number
          room_id?: string | null
          room_name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          amenities: string[]
          capacity: number
          created_at: string | null
          description: string
          featured: boolean
          id: string
          images: string[]
          name: string
          price: number
          promotion: boolean
          promotionType: string | null
          updated_at: string | null
        }
        Insert: {
          amenities?: string[]
          capacity: number
          created_at?: string | null
          description: string
          featured?: boolean
          id?: string
          images?: string[]
          name: string
          price: number
          promotion?: boolean
          promotionType?: string | null
          updated_at?: string | null
        }
        Update: {
          amenities?: string[]
          capacity?: number
          created_at?: string | null
          description?: string
          featured?: boolean
          id?: string
          images?: string[]
          name?: string
          price?: number
          promotion?: boolean
          promotionType?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          featured: boolean
          icon: string
          id: string
          images: string[]
          name: string
          promotion: boolean
          promotiontype: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          featured?: boolean
          icon: string
          id?: string
          images?: string[]
          name: string
          promotion?: boolean
          promotiontype?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          featured?: boolean
          icon?: string
          id?: string
          images?: string[]
          name?: string
          promotion?: boolean
          promotiontype?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
