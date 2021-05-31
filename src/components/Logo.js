import './css/Logo.css'
export default function Logo() {
    return (
        <div className='logo'>
            <img alt='logo' className='logo__image' src='images/diet.svg' />
            <p className='logo__name'>Diet planner</p>
        </div>
    )
}