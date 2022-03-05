import styled, { StyledComponent } from '@emotion/styled';
// eslint-disable-next-line import/no-extraneous-dependencies
import css from 'styled-jsx/css';
import * as ss from 'styled-system';

export type ComposeType = ss.SpaceProps &
  ss.GridProps &
  ss.ColorProps &
  ss.BackgroundProps &
  ss.LayoutProps &
  ss.BorderProps &
  ss.PositionProps &
  ss.FlexBoxProps &
  ss.ShadowProps &
  ss.TypographyProps;

export const Compose = ss.compose(
  ss.space,
  ss.background,
  ss.grid,
  ss.color,
  ss.layout,
  ss.border,
  ss.position,
  ss.shadow,
  ss.flexbox,
  ss.typography,
);

export const CommenStyle = (
  component,
  style = '',
): StyledComponent<ComposeType> => styled(component)`
  ${Compose}
  ${ss.background}
    ${ss.grid}
    ${ss.color}
    ${ss.layout}
    ${ss.border}
    ${ss.position}
    ${ss.shadow}
    ${ss.flexbox}
    ${ss.typography}
    ${style}
    display:${({ isCenter }): string => isCenter && 'flex'};
  justify-content: ${({ isCenter }): string => isCenter && 'center'};
  align-items: ${({ isCenter }): string => isCenter && 'center'};
`;

export const inputStyleRtl = css`
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  label {
    right: 1rem;
  }
  .input {
    text-align: right;
  }
  .label {
    color: #1890ff;
    top: -1rem;
    font-size: 1.25rem;
    right: 1.25rem;
  }
`;
export const inputStyleLtr = css`
  transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  label {
    left: 1rem;
  }
  .input {
    text-align: left;
  }
  .label {
    color: #1890ff;
    top: -1rem;
    font-size: 1.25rem;
    left: 1.25rem;
  }
`;
export const SDiv = CommenStyle('div');
