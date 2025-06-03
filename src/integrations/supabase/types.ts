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
      bicep_curl: {
        Row: {
          duration: number | null
          end_time: string | null
          feedback: string | null
          form: number | null
          id: number
          reps: number | null
          speed: number | null
          start_time: string | null
        }
        Insert: {
          duration?: number | null
          end_time?: string | null
          feedback?: string | null
          form?: number | null
          id?: number
          reps?: number | null
          speed?: number | null
          start_time?: string | null
        }
        Update: {
          duration?: number | null
          end_time?: string | null
          feedback?: string | null
          form?: number | null
          id?: number
          reps?: number | null
          speed?: number | null
          start_time?: string | null
        }
        Relationships: []
      }
      driver_applications: {
        Row: {
          car_back_photo_url: string | null
          car_front_photo_url: string | null
          created_at: string | null
          criminal_record_url: string | null
          driver_card_url: string | null
          driver_photo_url: string | null
          driving_license_url: string | null
          earnings: number | null
          email: string
          first_name: string
          id: string
          identity_number: string
          identity_type: string
          is_active: boolean | null
          last_name: string
          leadership_license_url: string | null
          password_confirmation: string
          phone: string
          rating: number | null
          status: string | null
          total_trips: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          car_back_photo_url?: string | null
          car_front_photo_url?: string | null
          created_at?: string | null
          criminal_record_url?: string | null
          driver_card_url?: string | null
          driver_photo_url?: string | null
          driving_license_url?: string | null
          earnings?: number | null
          email: string
          first_name: string
          id?: string
          identity_number: string
          identity_type: string
          is_active?: boolean | null
          last_name: string
          leadership_license_url?: string | null
          password_confirmation: string
          phone: string
          rating?: number | null
          status?: string | null
          total_trips?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          car_back_photo_url?: string | null
          car_front_photo_url?: string | null
          created_at?: string | null
          criminal_record_url?: string | null
          driver_card_url?: string | null
          driver_photo_url?: string | null
          driving_license_url?: string | null
          earnings?: number | null
          email?: string
          first_name?: string
          id?: string
          identity_number?: string
          identity_type?: string
          is_active?: boolean | null
          last_name?: string
          leadership_license_url?: string | null
          password_confirmation?: string
          phone?: string
          rating?: number | null
          status?: string | null
          total_trips?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      driver_locations: {
        Row: {
          driver_id: string
          heading: number | null
          id: string
          is_available: boolean | null
          latitude: number
          longitude: number
          speed: number | null
          updated_at: string | null
        }
        Insert: {
          driver_id: string
          heading?: number | null
          id?: string
          is_available?: boolean | null
          latitude: number
          longitude: number
          speed?: number | null
          updated_at?: string | null
        }
        Update: {
          driver_id?: string
          heading?: number | null
          id?: string
          is_available?: boolean | null
          latitude?: number
          longitude?: number
          speed?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_locations_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_profiles: {
        Row: {
          created_at: string | null
          earnings_total: number | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          license_expiry: string
          license_number: string
          updated_at: string | null
          vehicle_color: string
          vehicle_make: string
          vehicle_model: string
          vehicle_plate: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null
          vehicle_year: number
        }
        Insert: {
          created_at?: string | null
          earnings_total?: number | null
          id: string
          is_active?: boolean | null
          is_verified?: boolean | null
          license_expiry: string
          license_number: string
          updated_at?: string | null
          vehicle_color: string
          vehicle_make: string
          vehicle_model: string
          vehicle_plate: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
          vehicle_year: number
        }
        Update: {
          created_at?: string | null
          earnings_total?: number | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          license_expiry?: string
          license_number?: string
          updated_at?: string | null
          vehicle_color?: string
          vehicle_make?: string
          vehicle_model?: string
          vehicle_plate?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
          vehicle_year?: number
        }
        Relationships: [
          {
            foreignKeyName: "driver_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_stats: {
        Row: {
          exercise: string
          feedback: string | null
          form: number | null
          id: number
          reps: number | null
          speed: number | null
          stage: string | null
          timestamp: string | null
        }
        Insert: {
          exercise: string
          feedback?: string | null
          form?: number | null
          id?: number
          reps?: number | null
          speed?: number | null
          stage?: string | null
          timestamp?: string | null
        }
        Update: {
          exercise?: string
          feedback?: string | null
          form?: number | null
          id?: number
          reps?: number | null
          speed?: number | null
          stage?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          payment_method: string
          processed_at: string | null
          ride_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method: string
          processed_at?: string | null
          ride_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string
          processed_at?: string | null
          ride_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          admin_role: Database["public"]["Enums"]["admin_role"] | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_verified: boolean | null
          phone_number: string | null
          rating: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          total_rides: number | null
          updated_at: string | null
        }
        Insert: {
          admin_role?: Database["public"]["Enums"]["admin_role"] | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_verified?: boolean | null
          phone_number?: string | null
          rating?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          total_rides?: number | null
          updated_at?: string | null
        }
        Update: {
          admin_role?: Database["public"]["Enums"]["admin_role"] | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_verified?: boolean | null
          phone_number?: string | null
          rating?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          total_rides?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string | null
          email: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          message?: string | null
          created_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          max_discount: number | null
          min_ride_amount: number | null
          title: string
          usage_limit: number | null
          used_count: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          max_discount?: number | null
          min_ride_amount?: number | null
          title: string
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_discount?: number | null
          min_ride_amount?: number | null
          title?: string
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      ride_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          reviewee_id: string
          reviewer_id: string
          ride_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          reviewee_id: string
          reviewer_id: string
          ride_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
          ride_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_reviews_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          actual_duration: number | null
          cancellation_reason: string | null
          cancelled_at: string | null
          completed_at: string | null
          created_at: string | null
          destination_address: string
          destination_latitude: number
          destination_longitude: number
          distance_km: number | null
          driver_id: string | null
          estimated_duration: number | null
          estimated_fare: number | null
          final_fare: number | null
          id: string
          passenger_id: string
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          scheduled_at: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["ride_status"] | null
          updated_at: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Insert: {
          actual_duration?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          destination_address: string
          destination_latitude: number
          destination_longitude: number
          distance_km?: number | null
          driver_id?: string | null
          estimated_duration?: number | null
          estimated_fare?: number | null
          final_fare?: number | null
          id?: string
          passenger_id: string
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Update: {
          actual_duration?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          destination_address?: string
          destination_latitude?: number
          destination_longitude?: number
          distance_km?: number | null
          driver_id?: string | null
          estimated_duration?: number | null
          estimated_fare?: number | null
          final_fare?: number | null
          id?: string
          passenger_id?: string
          pickup_address?: string
          pickup_latitude?: number
          pickup_longitude?: number
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_passenger_id_fkey"
            columns: ["passenger_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shoulder_press: {
        Row: {
          duration: number | null
          end_time: string | null
          feedback: string | null
          form: number | null
          id: number
          reps: number | null
          speed: number | null
          start_time: string | null
        }
        Insert: {
          duration?: number | null
          end_time?: string | null
          feedback?: string | null
          form?: number | null
          id?: number
          reps?: number | null
          speed?: number | null
          start_time?: string | null
        }
        Update: {
          duration?: number | null
          end_time?: string | null
          feedback?: string | null
          form?: number | null
          id?: number
          reps?: number | null
          speed?: number | null
          start_time?: string | null
        }
        Relationships: []
      }
      user_promotions: {
        Row: {
          discount_applied: number
          id: string
          promotion_id: string
          ride_id: string | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          discount_applied: number
          id?: string
          promotion_id: string
          ride_id?: string | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          discount_applied?: number
          id?: string
          promotion_id?: string
          ride_id?: string | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_promotions_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_promotions_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_promotions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          id: string;
          rating: number;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          rating: number;
          comment: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          rating?: number;
          comment?: string;
          created_at?: string;
        };
        Relationships: [];
      },
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "admin" | "moderator" | "user"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      ride_status:
        | "pending"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
      user_role: "passenger" | "driver" | "admin"
      vehicle_type: "economy" | "comfort" | "premium" | "suv"
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
    Enums: {
      admin_role: ["admin", "moderator", "user"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      ride_status: [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      user_role: ["passenger", "driver", "admin"],
      vehicle_type: ["economy", "comfort", "premium", "suv"],
    },
  },
} as const
