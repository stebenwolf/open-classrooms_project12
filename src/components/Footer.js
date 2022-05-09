import '../styles/Footer.css';
import meditation from '../assets/icon_meditation.svg';
import swimming from '../assets/icon_swimming.svg';
import biking from '../assets/icon_biking.svg';
import weight from '../assets/icon_weightlifting.svg';

function Footer() {
    return (
        <footer>
            <div className='sportsIcons'>
                <img src={meditation} alt="meditation"></img>
                <img src={swimming} alt="swimming"></img>
                <img src={biking} alt="biking"></img>
                <img src={weight} alt="weightLifting"></img>
            </div>
            <p>&copy; SportSee 2022</p>
        </footer>
    )
}

export default Footer;