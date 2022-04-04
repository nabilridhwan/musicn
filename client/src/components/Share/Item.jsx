export default function Item({ track }) {
    return (
        <div>
            <img src={track.album.images[0].url} className="w-fit h-auto" />
        </div>
    )
}