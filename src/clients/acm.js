import {
    ACMClient,
    RequestCertificateCommand,
    DescribeCertificateCommand,
} from "@aws-sdk/client-acm";

const acmClient = new ACMClient({});

export const requestCertificate = async () => {
    const response = await acmClient.send(
        new RequestCertificateCommand({
            DomainName: `${process.env.APP_NAME}.${process.env.PROJECT_NAME}.io`,
            ValidationMethod: "DNS",
            KeyAlgorithm: "RSA_2048",
        })
    );
    return response;
};
export const describeCertificate = async (certid) => {
    const response = await acmClient.send(
        new DescribeCertificateCommand({
            CertificateArn: `arn:aws:acm:${process.env.REGION}:${process.env.ACCOUNT_ID}:certificate/${certid}`,
        })
    );
    return response;
};
