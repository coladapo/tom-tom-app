import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { RootState } from '../store';
import { updatePreferences } from '../store/slices/userSlice';
import { theme } from '../theme';

export const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.user.preferences);

  const handleToggle = (key: keyof typeof preferences) => {
    dispatch(updatePreferences({ [key]: !preferences[key] }));
  };

  const settingsSections = [
    {
      title: 'Rituals',
      items: [
        {
          icon: 'sunrise',
          label: 'Morning Ritual Time',
          value: preferences.morningRitualTime,
          type: 'time',
        },
        {
          icon: 'sunset',
          label: 'Evening Ritual Time',
          value: preferences.eveningRitualTime,
          type: 'time',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: 'bell',
          label: 'Enable Notifications',
          value: preferences.notificationsEnabled,
          type: 'toggle',
          key: 'notificationsEnabled',
        },
      ],
    },
    {
      title: 'Display',
      items: [
        {
          icon: 'heart',
          label: 'Show Sentiment Indicators',
          value: preferences.sentimentIndicatorsEnabled,
          type: 'toggle',
          key: 'sentimentIndicatorsEnabled',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.lastItem,
                  ]}>
                  <View style={styles.settingLeft}>
                    <Icon
                      name={item.icon}
                      size={20}
                      color={theme.colors.textSecondary}
                      style={styles.settingIcon}
                    />
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value as boolean}
                      onValueChange={() => handleToggle(item.key as any)}
                      trackColor={{
                        false: theme.colors.divider,
                        true: theme.colors.primary,
                      }}
                      thumbColor={theme.colors.white}
                    />
                  ) : (
                    <TouchableOpacity style={styles.settingValue}>
                      <Text style={styles.settingValueText}>
                        {item.value as string}
                      </Text>
                      <Icon
                        name="chevron-right"
                        size={16}
                        color={theme.colors.textLight}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.version}>Version 0.0.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    marginLeft: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  sectionContent: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: theme.spacing.md,
  },
  settingLabel: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  footer: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  version: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textLight,
  },
});
