import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { clsx } from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [newFontColor, setNewFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [newFamilyOption, setNewFamilyOption] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);
	const [newBackgroundColor, setNewBackgroundColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	);
	const [newfontSizeOption, setNewfontSizeOption] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);
	const [newContentWidth, setNewContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
	});

	const reset = () => {
		setCurrentArticleState({
			contentWidth: defaultArticleState.contentWidth,
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			backgroundColor: defaultArticleState.backgroundColor,
			fontColor: defaultArticleState.fontColor,
		});
	};
	const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState({
			contentWidth: newContentWidth,
			fontFamilyOption: newFamilyOption,
			fontSizeOption: newfontSizeOption,
			backgroundColor: newBackgroundColor,
			fontColor: newFontColor,
		});
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} OnClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form onSubmit={handleSubmitForm} className={styles.form}>
					<Select
						options={fontFamilyOptions}
						placeholder={newFamilyOption.value}
						selected={newFamilyOption}
						onChange={setNewFamilyOption}
						title='шрифт'
					/>

					<RadioGroup
						name={'_radio_item'}
						options={fontSizeOptions}
						selected={newfontSizeOption}
						onChange={setNewfontSizeOption}
						title='размер шрифта'
					/>

					<Select
						options={fontColors}
						placeholder={newFontColor.value}
						selected={newFontColor}
						onChange={setNewFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						placeholder={newBackgroundColor.value}
						selected={newBackgroundColor}
						onChange={setNewBackgroundColor}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						placeholder={newContentWidth.value}
						selected={newContentWidth}
						onChange={setNewContentWidth}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
// backgroundColor:newBackgroundColor,
// contentWidth:newContentWidth,
// fontSizeOption:newfontSizeOption,
