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
      bookings: {
        Row: {
          address: string | null
          adults: number
          booking_reference: string | null
          check_in_date: string
          check_out_date: string
          children: number
          city: string | null
          cleaning_fee: number
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          nights: number
          payment_method: string
          phone: string
          service_fee: number
          special_requests: string | null
          suite_id: string
          suite_name: string
          suite_price: number
          suite_total: number
          total_price: number
          updated_at: string
        }
        Insert: {
          address?: string | null
          adults: number
          booking_reference?: string | null
          check_in_date: string
          check_out_date: string
          children: number
          city?: string | null
          cleaning_fee?: number
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          nights: number
          payment_method: string
          phone: string
          service_fee?: number
          special_requests?: string | null
          suite_id: string
          suite_name: string
          suite_price: number
          suite_total: number
          total_price: number
          updated_at?: string
        }
        Update: {
          address?: string | null
          adults?: number
          booking_reference?: string | null
          check_in_date?: string
          check_out_date?: string
          children?: number
          city?: string | null
          cleaning_fee?: number
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          nights?: number
          payment_method?: string
          phone?: string
          service_fee?: number
          special_requests?: string | null
          suite_id?: string
          suite_name?: string
          suite_price?: number
          suite_total?: number
          total_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_type: string
          image_url: string
          order_index: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_type: string
          image_url: string
          order_index?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_type?: string
          image_url?: string
          order_index?: number | null
        }
        Relationships: []
      }
      payment_details: {
        Row: {
          booking_id: string
          card_cvc_encrypted: string | null
          card_expiry_encrypted: string | null
          card_last_four: string | null
          card_name: string | null
          card_number_encrypted: string | null
          created_at: string
          id: string
        }
        Insert: {
          booking_id: string
          card_cvc_encrypted?: string | null
          card_expiry_encrypted?: string | null
          card_last_four?: string | null
          card_name?: string | null
          card_number_encrypted?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          booking_id?: string
          card_cvc_encrypted?: string | null
          card_expiry_encrypted?: string | null
          card_last_four?: string | null
          card_name?: string | null
          card_number_encrypted?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_details_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      suite_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          order_index: number | null
          suite_category: string | null
          suite_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          order_index?: number | null
          suite_category?: string | null
          suite_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          order_index?: number | null
          suite_category?: string | null
          suite_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suite_images_suite_id_fkey"
            columns: ["suite_id"]
            isOneToOne: false
            referencedRelation: "suites"
            referencedColumns: ["id"]
          },
        ]
      }
      suites: {
        Row: {
          capacity: number
          created_at: string
          description: string
          features: string[]
          id: string
          image: string
          location: string
          name: string
          price: number
          size: number
          updated_at: string
        }
        Insert: {
          capacity: number
          created_at?: string
          description: string
          features?: string[]
          id?: string
          image: string
          location: string
          name: string
          price: number
          size: number
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          description?: string
          features?: string[]
          id?: string
          image?: string
          location?: string
          name?: string
          price?: number
          size?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
