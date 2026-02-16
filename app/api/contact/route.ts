import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, inquiryType, message } = body;

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'bde5cb53-0516-44b4-abac-f71150176793',
        subject: `[Movement] New Inquiry: ${inquiryType} from ${name}`,
        from_name: 'Movement Website',
        name,
        email,
        message: `Company: ${company}\nType: ${inquiryType}\n\nMessage: ${message}`,
        replyto: email
      }),
    });

    const responseText = await response.text();
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Invalid JSON from Web3Forms:', responseText);
      return NextResponse.json({ error: `Web3Forms Invalid Response: ${responseText.substring(0, 50)}...` }, { status: 500 });
    }

    if (result.success) {
      return NextResponse.json({ success: true, data: result });
    } else {
      console.error('Web3Forms Error:', result);
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
  }
}
