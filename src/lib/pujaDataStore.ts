import { create } from "zustand"
import { PujaParticipant } from "./readPujaData"

type PujaDataStore = {
  participants: PujaParticipant[]
  setParticipants: (participants: PujaParticipant[]) => void
  clearParticipants: () => void
}

export const usePujaDataStore = create<PujaDataStore>((set) => ({
  participants: [],
  setParticipants: (participants) => set({ participants: participants }),
  clearParticipants: () => set({ participants: [] })
}))
