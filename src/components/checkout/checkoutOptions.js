export const STATES = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Other']
export const OCCASIONS = ['Diwali', 'Wedding', 'Birthday', 'Corporate gifting', 'Other']
export const PAYMENTS = ['UPI', 'Card', 'Bank Transfer']

export const minDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 20)
  return date.toISOString().slice(0, 10)
}
