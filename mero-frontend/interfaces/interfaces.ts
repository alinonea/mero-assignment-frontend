export interface Salon{
    id: number
    name: string
    image_link: string
}

export interface RatingInterface{
    id: number
    text: string
    stars: string
    salonId: number
    userId: number
    user : User
}

interface User {
    id: number
    username: string
    full_name: string
}

export interface UserRating{
    id: number
    text: string
    stars: string
    salonId: number
    userId: number
}
