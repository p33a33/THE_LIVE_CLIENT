import stripe from 'tipsi-stripe';
import { doPayment } from './api';

stripe.setOptions({
    publishableKey: 'pk_test_9y1fBZMIdEzt1Gu5AQPzCrJ2',
});

module.exports = {

    requestPayment: (amount) => {
        return stripe
            .paymentRequestWithCardForm()
            .then(stripeTokenInfo => {
                console.log('cardform request response', stripeTokenInfo)
                return doPayment(amount, stripeTokenInfo.tokenId);
            })
            .then(() => {
                console.warn('Payment succeeded!');
            })
            .catch(error => {
                console.warn('Payment failed', { error });
            })
    }
}
