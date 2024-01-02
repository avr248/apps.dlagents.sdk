import {
    ACMClient,
    RequestCertificateCommand,
    DescribeCertificateCommand,
} from "@aws-sdk/client-acm";

const acmClient = new ACMClient({});

export const requestCertificate = async (domain) => {
    const response = await acmClient.send(
        new RequestCertificateCommand({
            DomainName: domain,
            ValidationMethod: "DNS",
            KeyAlgorithm: "RSA_2048",
        })
    );
    return response;
};
export const describeCertificate = async (arn) => {
    const response = await acmClient.send(
        new DescribeCertificateCommand({ CertificateArn: arn })
    );
    return response;
};
