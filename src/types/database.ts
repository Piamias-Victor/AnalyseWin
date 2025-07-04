export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pharmacies: {
        Row: {
          id: number
          nom_pharmacie: string
          code_interne: string
          adresse: string | null
          telephone: string | null
          email: string | null
          statut: string
          created_at: string
        }
        Insert: {
          id?: number
          nom_pharmacie: string
          code_interne: string
          adresse?: string | null
          telephone?: string | null
          email?: string | null
          statut?: string
          created_at?: string
        }
        Update: {
          id?: number
          nom_pharmacie?: string
          code_interne?: string
          adresse?: string | null
          telephone?: string | null
          email?: string | null
          statut?: string
          created_at?: string
        }
      }
      familles: {
        Row: {
          id: number
          nom_famille: string
          parent_id: number | null
          niveau: number
          code_famille: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          nom_famille: string
          parent_id?: number | null
          niveau?: number
          code_famille?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          nom_famille?: string
          parent_id?: number | null
          niveau?: number
          code_famille?: string | null
          description?: string | null
          created_at?: string
        }
      }
      fournisseurs: {
        Row: {
          id: number
          code_fournisseur: string
          nom_fournisseur: string
          email: string | null
          telephone: string | null
          statut: string
          pharmacie_id: number
          created_at: string
        }
        Insert: {
          id?: number
          code_fournisseur: string
          nom_fournisseur: string
          email?: string | null
          telephone?: string | null
          statut?: string
          pharmacie_id: number
          created_at?: string
        }
        Update: {
          id?: number
          code_fournisseur?: string
          nom_fournisseur?: string
          email?: string | null
          telephone?: string | null
          statut?: string
          pharmacie_id?: number
          created_at?: string
        }
      }
      produits: {
        Row: {
          id: number
          ean13_principal: string
          designation: string
          tva: number
          famille_id: number | null
          statut: string
          pharmacie_id: number
          date_creation: string
          date_modification: string
        }
        Insert: {
          id?: number
          ean13_principal: string
          designation: string
          tva?: number
          famille_id?: number | null
          statut?: string
          pharmacie_id: number
          date_creation?: string
          date_modification?: string
        }
        Update: {
          id?: number
          ean13_principal?: string
          designation?: string
          tva?: number
          famille_id?: number | null
          statut?: string
          pharmacie_id?: number
          date_creation?: string
          date_modification?: string
        }
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