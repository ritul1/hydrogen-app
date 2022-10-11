import {Suspense} from 'react'
import {AccountContactForm} from '~/components';
import {Layout} from '~/components/index.server';
import {CacheNone, Seo, gql} from '@shopify/hydrogen';
import {getApiErrorMessage} from '~/lib/utils';

export default function Contact() {

    return (
      <Layout>
        <Suspense>
          <Seo type="noindex" data={{title: 'Contact'}} />
        </Suspense>
        <AccountContactForm />
      </Layout>
    );
  }


  export async function api(request, {queryShop}) {
    const jsonBody = await request.json();
    if (!jsonBody.name || !jsonBody.email) {
      return new Response(
        JSON.stringify({error: 'Name and Email are required'}),
        {status: 400},
      );
    }
    const {data, errors} = await queryShop({
      
      query: CUSTOMER_CONTACT_MUTATION,
      variables: {
        input: {
          name: jsonBody.name,
          email: jsonBody.email,  
          message: jsonBody.message,
        },
      },
      // @ts-expect-error `queryShop.cache` is not yet supported but soon will be.
      cache: CacheNone(),
    });
  
    const errorMessage = getApiErrorMessage('ContactUS',data, errors);
    if (
      !errorMessage &&
      data &&
      data.customerCreate &&
      data.customerCreate.customer &&
      data.customerCreate.customer.name
    ) {
      return new Response(null, {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({
          error: errorMessage ?? 'Unknown error',
        }),
        {status: 401},
      );
    }
    
  }

  const CUSTOMER_CONTACT_MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
