import { RANDOM_PROFILE_PICTURES } from "./constants";

export default function getRandomProfileImage(): string {
    return RANDOM_PROFILE_PICTURES[
        Math.floor(Math.random() * RANDOM_PROFILE_PICTURES.length)
    ];
}