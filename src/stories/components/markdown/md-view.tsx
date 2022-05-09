
import React, { useEffect, useState } from 'react';
import dompurify from 'dompurify';
import styled from '@emotion/styled';

export type MarkDownHeaders = {
    level: number;
    title: string;
    id: string;
    href: string;
};

interface Props {
    markdownText: string;
    mdUrl?: string;
    headersLevel: MarkDownHeaders[];
}

const MdViewerPage = ({ markdownText, mdUrl = '', headersLevel }: Props) => {
  const [activeLink, setActiveLink] = useState('');
  const sanitizer = dompurify.sanitize;

  useEffect(() => {
    const ids = headersLevel.map((header) => header.id);
    const linkRefs = ids.map((id) => document.querySelector(`a[href='#${id}']`));

    const onScroll = () => {
      let lastScrolledLink = linkRefs[0];

      linkRefs.forEach((link) => {
        if (link) {
          const topPosition = link.getBoundingClientRect().top;
          if (topPosition <= 20) {
            lastScrolledLink = link;
          }
        }
      });

      if (lastScrolledLink) {
        setActiveLink(lastScrolledLink.id);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
        <Container >
            <ViewerContainer
                className="markDownContent"
                dangerouslySetInnerHTML={{ __html: sanitizer(markdownText) }}
            />
        </Container>
  );
};

export default MdViewerPage;

const Container = styled.div`
  display: flex;
   flex-direction:'column';
   padding-left: 32px;
   padding-right:32px;
`;

const ViewerContainer = styled.div`
   max-width:1116px;
   background: #F9F9F9;
  text-align: justify;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 40px;
  padding-top: 11px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;
